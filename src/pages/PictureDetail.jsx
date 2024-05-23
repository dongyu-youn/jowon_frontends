import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ModalComponent from "../components/Modal";
import Cookies from "js-cookie";
import SurveyModal from "../components/SurveyModal";

function PictureDetail() {
  const [video, setVideo] = useState(null);
  const [apply, setApply] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장하는 state

  const [isModalOpenC, setIsModalOpenC] = useState(false);

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

  const toggleLike = async (e) => {
    e.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 함
    e.preventDefault();
    console.log("toggleLike 함수가 실행되었습니다"); // 함수가 실행될 때 로그 출력
    try {
      // 클라이언트에서 좋아요 상태를 토글하면서 백엔드로 전송할 대회의 ID
      const contestId = video.id;

      // 좋아요 상태를 토글합니다.
      const newLiked = !apply;
      setApply(newLiked); // 새로운 좋아요 상태를 설정

      const userToken = Cookies.get("csrftoken") || "";

      const axiosInstance = axios.create({
        withCredentials: true,
        headers: {
          "X-CSRFToken": userToken,
        },
      });

      // 서버로 좋아요 상태를 전송합니다.
      await axiosInstance.put("http://127.0.0.1:8000/users/me/apply/", {
        id: contestId,
      });

      // 좋아요 상태를 확인하여 다시 설정합니다.
      checkApplyStatus();

      // 새로운 Conversation을 생성하기 위한 POST 요청
      const conversationData = {
        teamName: video.제목, // 필요한 데이터 설정
      };

      await axiosInstance.post(
        "http://127.0.0.1:8000/conversations/",
        conversationData
      );
      console.log("New conversation created");
    } catch (error) {
      console.error("Error toggling like:", error);
      // 에러 처리 로직 추가
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
          <h2 className="text-4xl font-bold py-2 mb-12 font-dongle_semibolde">
            이름 : {video.제목}
          </h2>
          <p className="text-2xl font-bold py-2  mb-4 font-dongle">
            연관학과 : {video.연관학과}
          </p>
          <p className="text-2xl font-bold py-2 mb-8 font-dongle">
            상금: {video.상금}
          </p>

          <p className="py-4 text-2xl  border-b border-gray-400 mb-12 font-dongle_light">
            학년: {video.학년}
          </p>
          <p className=" flex items-center justify-center py-4 text-2xl  border-b border-gray-400 mb-12 font-dongle_light">
            분야: {video.분야}
          </p>
          <p className=" flex items-center justify-center py-4 text-2xl  border-b border-gray-400 mb-12 font-dongle_light">
            위치: {video.위치}
          </p>
          <p className=" flex items-center justify-center py-4 text-2xl  border-b border-gray-400 mb-12 font-dongle_light">
            참고링크: {video.참고링크}
          </p>

          <Button
            className="mt-20"
            text="팀원조회"
            onClick={handleButtonClick}
          ></Button>

          {apply ? (
            <Button className="" text="완료" onClick={toggleLike}></Button>
          ) : (
            <Button className="" text="신청하기" onClick={toggleModal}></Button>
            // 나중에 toggleLike
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
