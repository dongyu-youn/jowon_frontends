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
import { useQuery } from "react-query";
import { normalizeUserScores } from "../Nomalize/NormalizeScores";

import { clusterUsersIntoTeams } from "../Nomalize/ClusterUsers";
import { kmeans } from "../utils/kmeas";
import TeamDisplay from "../Nomalize/TeamDisplay";

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

  const [applys, setApplys] = useState(null);

  const [teams, setTeams] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/contests/${id}/applicants/`
        ); // id 값을 이용하여 서버로 요청
        setApplys(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  const handleMatching = async () => {
    if (!applys) return;
    const normalizedUsers = normalizeUserScores(applys);
    const numTeams = 3;

    try {
      const teams = kmeans(
        normalizedUsers.map((user) => [
          user.normalizedScore.grade,
          user.normalizedScore.github_commit_count,
          user.normalizedScore.baekjoon_score,
          user.normalizedScore.programmers_score,
          user.normalizedScore.certificate_count,
        ]),
        numTeams
      );
      setTeams(teams);
    } catch (error) {
      console.error("Error clustering users into teams:", error);
    }
  };
  const handleMatchingSame = (predictions) => {
    if (!predictions || predictions.length === 0) {
      console.log("No predictions available.");
      return;
    }
    console.log("Predictions:", predictions);

    // 예측 값을 기준으로 팀을 균등하게 구성
    const numTeams = Math.ceil(predictions.length / 3);
    let teams = Array.from({ length: numTeams }, () => []);

    predictions.forEach((prediction, index) => {
      teams[index % numTeams].push(prediction);
    });

    // 팀 매칭 결과 로그 출력
    teams.forEach((team, index) => {
      console.log(`Team ${index + 1}:`);
      team.forEach((member) => {
        console.log(
          `- ${member.user_name}: ${JSON.stringify(member.predictions)}`
        );
      });
    });

    console.log("Selected Participants:", teams);
    setTeams(teams);
  };

  const toggleModal = () => {
    setIsModalOpenC(!isModalOpenC);
  };

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

  const toggleLike = async (
    e,
    selectedChoices,
    matchingType,
    teamMembers = [],
    isTeam
  ) => {
    e.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 함
    e.preventDefault();
    console.log("toggleLike 함수가 실행되었습니다");

    try {
      setLoading(true);

      navigate("/notifications", { state: { loading: true } });

      const contestId = video.id;
      const newLiked = !apply;
      setApply(newLiked);

      const userToken = Cookies.get("csrftoken") || "";
      const axiosInstance = axios.create({
        withCredentials: true,
        headers: {
          "X-CSRFToken": userToken,
        },
      });

      await axiosInstance.put("http://127.0.0.1:8000/users/me/apply/", {
        id: contestId,
      });

      checkApplyStatus();

      await axiosInstance.put(
        "http://127.0.0.1:8000/users/update-selected-choices/",
        { selected_choices: selectedChoices, contest_id: contestId }
      );
      console.log("Selected choices updated");

      let selectedParticipants;

      if (matchingType == "same") {
        const teamMemberResponses = await Promise.all(
          teamMembers.map((memberId) =>
            axiosInstance.get(`http://127.0.0.1:8000/users/${memberId}`)
          )
        );
        selectedParticipants = teamMemberResponses.map(
          (response) => response.data
        );
        console.log(selectedParticipants);

        // const teamMembers = teamMemberResponses.map((response) => {
        //   console.log(response.data); // 여기서 response.data의 구조를 확인합니다.
        // });

        let NselectedParticipants = selectedParticipants.map((member) => ({
          user_id: member.id,
          user_name: member.username,
          avatar: member.avatar,
          department: member.department,
        }));
        console.log("Selected Participants for team:", NselectedParticipants);

        const conversationData = {
          teamName: video.제목,
          selected_choices: selectedChoices,

          contest_id: contestId,
          image: video.사진,
          matching_type: "same",
          participants: NselectedParticipants.map(
            (participant) => participant.user_id
          ),
        };
        console.log("Conversation data being sent:", conversationData);

        const conversationResponse = await axiosInstance.post(
          "http://127.0.0.1:8000/conversations/",
          conversationData
        );
        let conversationId = conversationResponse.data.id;
        console.log("New conversation created", conversationId);
        const NotiData = {
          receiver: 1,
          message: video.제목,
          image: video.사진,
          conversation_id: conversationResponse.data.id,
        };
        await axiosInstance.post(
          "http://127.0.0.1:8000/notifications/",
          NotiData
        );
        console.log("New notification created");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
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

          <div className="flex justify-center mt-8">
            <Button
              className="mt-32 mr-24 relative"
              text="신청자조회"
              onClick={handleButtonClick}
            ></Button>

            {apply ? (
              <Button className="" text="완료" onClick={toggleLike} />
            ) : (
              <Button className="" text="신청하기" onClick={toggleModal} />
            )}
            <Button
              onClick={() => (
                (window.location.href =
                  "https://www.notion.so/e035871677eb43b7bf71d168b8e9981e?pvs=4"),
                "_blank"
              )}
              className="mt-32 mr-24 bg-cover text-white"
              text="노션게시판"
              style={{}}
            />
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
      {teams.length > 0 && <TeamDisplay teams={teams} />}
    </>
  );
}

export default PictureDetail;
