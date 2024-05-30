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
  const [video, setVideo] = useState(null);
  const [apply, setApply] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장하는 state

  const [isModalOpenC, setIsModalOpenC] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅을 초기화합니다

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

  const toggleLike = async (e, selectedChoices) => {
    e.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 함
    e.preventDefault();
    console.log("toggleLike 함수가 실행되었습니다"); // 함수가 실행될 때 로그 출력

    // 알림 페이지로 즉시 리디렉션
    navigate("/notifications");

    try {
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

      // 인공지능 모델 실행
      const aiResponse = await axiosInstance.post(
        "http://127.0.0.1:8000/predictor/",
        {
          grade: 3,
          depart: 3,
          credit: 2,
          in_school_award_cnt: 1,
          out_school_award_cnt: 1,
          national_competition_award_cnt: 2,
          certificate: 50,
          subject: 50,
          major_field: 50,
          codingTest_score: 2,
        }
      );
      console.log("AI model executed", aiResponse.data);

      // 새로운 Conversation 생성
      const conversationData = {
        teamName: video.제목, // 필요한 데이터 설정
        selected_choices: selectedChoices, // 선택된 값을 포함
        contest_id: contestId, // contest_id를 추가
        image: video.사진,
      };

      await axiosInstance.post(
        "http://127.0.0.1:8000/conversations/",
        conversationData
      );
      console.log("New conversation created");

      // 새로운 알림 생성
      const NotiData = {
        receiver: 1, // 사용자 ID
        message: video.제목,
        image: video.사진,
      };
      await axiosInstance.post(
        "http://127.0.0.1:8000/notifications/",
        NotiData
      );
      console.log("New noti created");
    } catch (error) {
      console.error("Error toggling like:", error);
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
        <img src={video.사진} className="w-1/6 px-20 basis-7/12" />

        <div className="w-full basis-5/12 flex flex-col p-4">
          <div className="flex items-center py-2 mb-12">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">이름</span>
            <span className="text-2xl font-dongle_light  w-2/3 ">
              {video.제목}
            </span>
          </div>
          <div className="flex items-center py-2 mb-4">
            <span className="text-2xl  font-dongle w-1/3 mr-40">연관학과</span>
            <span className="text-2xl  font-dongle w-2/3 ">
              {video.연관학과}
            </span>
          </div>
          <div className="flex items-center py-2 mb-8">
            <span className="text-2xl font-dongle w-1/3 mr-40">상금 </span>
            <span className="text-2xl font-dongle w-2/3">{video.상금}</span>
          </div>
          <div className="flex items-center py-4  mb-12">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              학년{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.학년}
            </span>
          </div>
          <div className="flex items-center py-4 mb-12">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              분야{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.분야}
            </span>
          </div>
          <div className="flex items-center py-4  mb-12">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              위치{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.위치}
            </span>
          </div>
          <div className="flex items-center py-4 mb-12">
            <span className="text-2xl font-dongle_light w-1/3 mr-40">
              참고링크{" "}
            </span>
            <span className="text-2xl font-dongle_light w-2/3">
              {video.참고링크}
            </span>
          </div>

          <Button
            className="mt-20"
            text="팀원조회"
            onClick={handleButtonClick}
          ></Button>

          {apply ? (
            <Button className="" text="완료" onClick={toggleLike}></Button>
          ) : (
            <Button className="" text="신청하기" onClick={toggleModal}></Button>
          )}
        </div>
      </section>

      {/* 모달 */}
      {isModalOpen && <ModalComponent video={video} closeModal={closeModal} />}

      {isModalOpenC && (
        <SurveyModal toggleLike={toggleLike} onClose={toggleModal} />
      )}

      <Footer />
    </>
  );
}

export default PictureDetail;
