import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ModalComponent from "../components/Modal";
import Cookies from "js-cookie";
import SurveyModal from "../components/SurveyModal";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 가져옵니다

function PictureDetail() {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [apply, setApply] = useState(false);
  const [predictions, setPredictions] = useState([]); // 추가된 부분
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장하는 state

  const [isModalOpenC, setIsModalOpenC] = useState(false);

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [graphs, setGraphs] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅을 초기화합니다

  const [matchingType, setMatchingType] = useState(""); // 초기값을 'random'으로 설정

  const toggleModal = () => {
    setIsModalOpenC(!isModalOpenC);
  };

  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/contests/${id}`
        ); // id 값을 이용하여 서버로 요청
        setVideo(response.data);
        console.log(response.data.사진);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  useEffect(() => {
    if (video) {
      checkApplyStatus();
    }
  }, [video]);
  console.log(video);

  const checkApplyStatus = async () => {
    const userToken = Cookies.get("csrftoken") || "";

    const axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "X-CSRFToken": userToken,
      },
    });
    try {
      // 좋아요 상태를 확인하는 요청을 보냄
      const response = await axiosInstance(
        "http://127.0.0.1:8000/users/me/apply/"
      );
      // 동영상 ID가 있는지 확인
      const isApply = response.data.some((fav) => fav.id === video.id);

      // 좋아요 상태를 업데이트
      setApply(isApply);
    } catch (error) {
      console.error("Error checking liked status:", error);
    }
  };

  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });
  const handleSubmit = async () => {
    try {
      // 메시지를 포함하여 axios로 POST 요청 보내기
      await axiosInstance.post("http://127.0.0.1:8000/notifications/", {
        receiver: 1, // 사용자 ID
        message: video.제목,
      });

      // 쿼리 다시 불러오기 등의 작업
    } catch (error) {
      console.error("Error proposing:", error);
    }
  };

  const toggleLike = async (e, selectedChoices, matchingType) => {
    e.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 함
    e.preventDefault();
    console.log("toggleLike 함수가 실행되었습니다"); // 함수가 실행될 때 로그 출력

    try {
      // 로딩 상태를 true로 설정
      setLoading(true);

      // 알림 페이지로 즉시 리디렉션
      navigate("/notifications", { state: { loading: true } });

      const contestId = video.id;
      const newLiked = !apply;
      setApply(newLiked); // 새로운 좋아요 상태를 설정

      const userToken = Cookies.get("csrftoken") || "";

      const axiosInstance = axios.create({
        withCredentials: true,
        headers: {
          "X-CSRFToken": userToken,
        },
      });

      // 서버로 좋아요 상태를 전송
      await axiosInstance.put("http://127.0.0.1:8000/users/me/apply/", {
        id: contestId,
      });

      // 좋아요 상태를 확인하여 다시 설정
      checkApplyStatus();

      // selected_choices 업데이트
      await axiosInstance.put(
        "http://127.0.0.1:8000/users/update-selected-choices/",
        { selected_choices: selectedChoices, contest_id: contestId }
      );
      console.log("Selected choices updated");

      // selectedChoices 배열의 합계 계산 (문자열 숫자를 숫자로 변환하여 합계 계산)
      const aptitudeTestScore = selectedChoices
        .map(Number) // 문자열을 숫자로 변환
        .reduce((acc, val) => acc + val, 0); // 합계 계산

      // 사용자 데이터 가져오기
      const applicantsResponse = await axiosInstance.get(
        `http://127.0.0.1:8000/contests/${contestId}/applicants/`
      );
      const userData = applicantsResponse.data;

      // 예측 데이터 가져오기
      const fetchPredictions = async () => {
        const newPredictions = [];
        for (const user of userData) {
          const studentData = {
            grade: user.score.grade,
            github_commit_count: user.score.github_commit_count,
            baekjoon_score: user.score.baekjoon_score,
            programmers_score: user.score.programmers_score,
            certificate_count: user.score.certificate_count,
            senior: user.score.senior,
            depart: user.score.depart,
            courses_taken: user.score.courses_taken,
            major_field: user.score.major_field,
            bootcamp_experience: user.score.bootcamp_experience,
            in_school_award_cnt: user.score.in_school_award_cnt,
            out_school_award_cnt: user.score.out_school_award_cnt,
            coding_test_score: user.score.coding_test_score,
            certificate_score: user.score.certificate_score,
            aptitude_test_score: selectedChoices
              .map(Number)
              .reduce((acc, val) => acc + val, 0), // aptitudeTestScore 계산
          };

          // 인공지능 모델 실행 전 데이터 확인
          const requestData = {
            students: studentData,
          };
          console.log(
            "Request Data for AI model:",
            JSON.stringify(requestData, null, 2)
          );

          try {
            const response = await axios.post(
              "http://127.0.0.1:8000/users/students/predict/",
              studentData
            );
            newPredictions.push({
              user_id: user.id,
              user_name: user.username,
              avatar: user.avatar,
              department: user.department,
              predictions: response.data,
            });
          } catch (error) {
            console.error("예측 요청 중 오류 발생:", error);
          }
        }

        // "GCGF 혁신 아이디어 공모" 예측값 기준으로 정렬
        newPredictions.sort(
          (a, b) =>
            b.predictions["GCGF 혁신 아이디어 공모"] -
            a.predictions["GCGF 혁신 아이디어 공모"]
        );
        console.log(newPredictions);
        setPredictions(newPredictions);
        return newPredictions;
      };

      const newPredictions = await fetchPredictions();
      console.log(newPredictions);

      // top_two일 경우 상위 3명을 선택
      let selectedParticipants = [];

      // top_two일 경우 상위 3명을 선택
      if (matchingType === "top_two") {
        selectedParticipants = newPredictions.slice(0, 4); // 상위 3명 선택
      } else if (matchingType === "same") {
        for (let i = 0; i < newPredictions.length; i += 3) {
          selectedParticipants.push(newPredictions.slice(i, i + 3));
        }
      }

      const conversationData = {
        teamName: video.제목,
        selected_choices: selectedChoices,
        contest_id: contestId,
        image: video.사진,
        ai_response: newPredictions, // AI 응답 데이터 추가
        matching_type: matchingType, // 매칭 타입 추가
        participants: selectedParticipants.map(
          (participant) => participant.user_id
        ), // 선택된 참가자들 추가
      };
      console.log("Conversation data being sent:", conversationData);

      const conversationResponse = await axiosInstance.post(
        "http://127.0.0.1:8000/conversations/",
        conversationData
      );
      const conversationId = conversationResponse.data.id; // 생성된 conversation의 ID를 가져옴
      console.log("New conversation created", conversationId);
      // 로딩 상태를 false로 설정

      // video 객체에 ai_response를 추가하여 업데이트
      video.ai_response = newPredictions;

      // 새로운 알림 생성
      const NotiData = {
        receiver: 1, // 사용자 ID
        message: video.제목,
        image: video.사진,
        conversation_id: conversationId, // 새로 생성된 conversation ID 추가
      };
      await axiosInstance.post(
        "http://127.0.0.1:8000/notifications/",
        NotiData
      );
      console.log("New noti created");
    } catch (error) {
      console.error("Error toggling like:", error);
      // 에러 발생 시 로딩 상태를 false로 설정
      setLoading(false);
    }
  };
  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 버튼 클릭 시 모달 열기
  const handleButtonClick = () => {
    openModal();
  };

  // 모달 영역 외의 곳을 클릭했을 때 모달을 닫기 위한 함수
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section
        className="flex flex-col md:flex-row p-4 items-center justify-center"
        onClick={handleOutsideClick}
      >
        <div className="w-1/6  basis-5/12 mr-24">
          <div className="text-2xl font-dongle_light mb-12  ">{video.제목}</div>
          <img src={video.사진} className="w-full" />
        </div>

        <div className="w-full basis-5/12 flex flex-col p-4">
          <div className="flex items-center py-2 ">
            <span className="text-2xl  font-dongle w-1/3 mr-40">연관학과</span>
            <span className="text-2xl  font-dongle w-2/3 ">
              {video.연관학과}
            </span>
          </div>
          <div className="flex items-center py-2 ">
            <span className="text-2xl font-dongle w-1/3 mr-40">시상금 </span>
            <span className="text-2xl font-dongle w-2/3">{video.상금}</span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              학년{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.학년}
            </span>
          </div>
          <div className="flex items-center py-4 ">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              분야{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.분야}
            </span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              위치{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.위치}
            </span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              응모분야{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.응모분야}
            </span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              참가대상{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.참가대상}
            </span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              접수기간{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.접수기간}
            </span>
          </div>
          <div className="flex items-center py-4">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              접수방법{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.접수방법}
            </span>
          </div>

          {/* <div className="flex items-center py-4 mb-12">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              참고링크{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.참고링크}
            </span>
          </div> */}
          <div className="flex justify-center ">
            <Button
              className="mt-32 mr-24"
              text="팀원조회"
              onClick={handleButtonClick}
            ></Button>

            {apply ? (
              <Button className="" text="완료" onClick={toggleLike}></Button>
            ) : (
              <Button
                className=""
                text="신청하기"
                onClick={toggleModal}
              ></Button>
            )}
          </div>
        </div>
      </section>

      {/* 모달 */}
      {isModalOpen && <ModalComponent video={video} closeModal={closeModal} />}

      {isModalOpenC && (
        <SurveyModal
          matchingType={setMatchingType}
          toggleLike={toggleLike}
          onClose={toggleModal}
        />
      )}

      <Footer />
    </>
  );
}

export default PictureDetail;
