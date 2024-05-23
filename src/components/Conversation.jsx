import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { FaFile } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { useQueryClient, useQuery } from "react-query"; // 변경된 부분
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import MiniProfileCard from "./MiniProfileCard";
import Footer from "./Footer";

const Conversation = () => {
  const [isExpanded, setIsExpanded] = useState(true); // 섹션의 확장 상태를 관리합니다.
  const [isThirdExpanded, setIsThirdExpanded] = useState(true); // 세 번째 섹션의 확장 상태를 관리합니다.
  const [messages, setMessages] = useState(""); // 입력된 메시지 상태

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const conversationId = window.location.pathname.split("/").pop();
  //       const response = await axios.get(
  //         `http://127.0.0.1:8000/conversations/messages/${conversationId}/`
  //       );
  //       setMessages(response.data);
  //     } catch (error) {
  //       console.error("Error fetching messages:", error);
  //     }
  //   };

  //   fetchMessages();
  // }, []); // 두 번째 인자로 빈 배열을 전달하여 최초 렌더링 시에만 useEffect가 실행되도록 함

  const toggleSection = () => {
    // 섹션의 확장 상태를 변경합니다.
    setIsExpanded(!isExpanded);
  };

  const toggleThirdSection = () => {
    setIsThirdExpanded(!isThirdExpanded);
  };
  // 가상의 데이터 생성
  const conversation = {
    participants: [
      {
        id: 1,
        first_name: "윤동규",
        avatar: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        first_name: "이한세",
        avatar: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        first_name: "김민혁",
        avatar: "https://via.placeholder.com/150",
      },
      // 추가 팀원들을 추가할 수 있습니다.
    ],
    messages: [
      {
        id: 1,
        user: { id: 1, first_name: "윤동규" },
        message: "안녕하세요!",
      },
      { id: 2, user: { id: 2, first_name: "이한세" }, message: "Hi!" },
      { id: 3, user: { id: 3, first_name: "김민혁" }, message: "안녕ㄴㅇ!" },
      // 추가 메시지들을 추가할 수 있습니다.
    ],
  };

  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/conversations/${id}`
        ); // id 값을 이용하여 서버로 요청
        setVideo(response.data);
        console.log(response.data.participants.username);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);
  if (!video) {
    return <div>Loading...</div>;
  }
  const userToken = Cookies.get("csrftoken") || "";

  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  // 메시지 전송 함수
  const sendMessage = async () => {
    try {
      // 서버에 메시지를 전송하는 POST 요청
      const conversationId = window.location.pathname.split("/").pop(); // URL에서 대화의 ID 추출
      await axiosInstance.post(
        `http://127.0.0.1:8000/conversations/messages/`,
        {
          message: messages, // 메시지 내용
          conversation: 2,
        }
      );

      // 메시지 전송 후 입력 창 비우기
      setMessages("");
      // 전송 후 새로고침
      window.location.reload();

      // 전송 완료 후 필요한 추가 작업 수행 가능
    } catch (error) {
      console.error("Error sending message:", error);
      // 오류 처리 로직 추가 가능
    }
  };

  const aiAnalysis = {
    probability: 85, // 예시 확률
    reason: "팀의 성과가 뛰어나며, 프로젝트의 혁신성이 높습니다.",
  };

  return (
    <section id="home" className="">
      <div className="relative w-full h-0 " style={{ paddingBottom: "40%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/videos/jown.jpeg"
            alt="Your Image Description"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-white text-5xl font-serif">
            Team's talking
          </h1>
        </div>
      </div>
      <div className="container mx-auto my-10 mt-32 flex justify-between min-h-50vh">
        {/* 토글 버튼 */}
        <div className="flex justify-center">
          {/* 확장/축소 아이콘 */}
          <button onClick={toggleSection} className="focus:outline-none">
            {!isExpanded ? (
              <FiChevronLeft size={64} />
            ) : (
              <FiChevronRight size={64} />
            )}
          </button>
        </div>
        <div className={`border w-1/4 p-10 ${isExpanded ? "" : "hidden"}`}>
          <span className="text-center w-full block text-lg font-medium">
            <h2>Conversation for </h2>
          </span>
          <div className="flex justify-between mt-10 items-center">
            {video.participants.map((participant) => (
              <MiniProfileCard key={participant.id} participant={participant} />
            ))}
          </div>
        </div>
        <div className="border flex-grow ml-10 p-10 flex flex-col">
          <div className="border mb-6 flex items-center justify-center rounded  p-2">
            {video.teamName}
          </div>
          {video.messages.map((message, index) => (
            <div
              key={index}
              className={`mb-10 flex items-center ${
                message.user.id !== 1 ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex items-center justify-center w-20 h-20 rounded-full   ml-4 ${
                  message.user.id !== 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {video.participants.username}
              </div>
              <div
                className={`p-5 rounded ${
                  message.user.id !== 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300 text-black" // 첫 번째 요소일 때 텍스트 색상을 검은색으로 변경
                }`}
                style={{
                  marginLeft: message.user.id !== 1 ? "0" : "12px",
                  color: message.user.id === 1 ? "black" : "", // 윤 프로필의 글자는 검은색으로 지정
                }}
              >
                <div>{message.message}</div>
              </div>
            </div>
          ))}
          <div className="mt-6 flex items-center w-full justify-center text-black">
            <input
              type="text"
              className="rounded w-10/12  border-gray-300 border p-2 mr-2 focus:outline-none focus:border-teal-500"
              placeholder="메시지를 입력하세요..."
              value={messages}
              onChange={(e) => setMessages(e.target.value)} // 입력된 메시지 업데이트
            />
            <button
              onClick={sendMessage}
              className="bg-teal-500 text-white py-2  px-8 items-center rounded focus:outline-none flex"
            >
              <span>전송</span>
            </button>
          </div>
        </div>

        <div
          className={`border w-1/4 p-10 ml-12 flex justify-center flex-col ${
            isThirdExpanded ? "" : "hidden"
          }`}
        >
          <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer ">
            <FaImage className="mr-4" size={24} /> <>사진/동영상</>
          </button>
          <div className="flex justify-between mt-10 items-center"></div>

          <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer ">
            <FaFile className="mr-4" size={24} /> <>파일</>
          </button>
          <div className="flex justify-between mt-10 items-center"></div>

          <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer ">
            <RiRobot2Line className="mr-4" size={24} /> <>수상가능성 분석</>
          </button>

          <div className="flex justify-between mt-10 items-center"></div>
        </div>
        {/* 두 번째 버튼 - 세 번째 섹션 토글 */}
        <div className="flex justify-center">
          <button onClick={toggleThirdSection} className="focus:outline-none">
            {!isThirdExpanded ? (
              <FiChevronRight size={64} />
            ) : (
              <FiChevronLeft size={64} />
            )}
          </button>
        </div>
      </div>
      <div className={`border p-10 container mx-auto min-h-50 mt-24 mb-40`}>
        <span className="text-center w-full block text-lg font-medium">
          <h2>인공지능 분석 결과</h2>
        </span>
        <div className="grid grid-cols-2 gap-4 mt-10 items-start">
          {video.participants.map((participant) => (
            <div key={participant.id} className="flex items-start">
              <div className="mr-4">
                <MiniProfileCard participant={participant} />
              </div>
              <div>
                <p className="text-sm">
                  <strong>{participant.name}</strong> 님은 총{" "}
                  <strong>40%</strong>의 확률로 성공할 것으로 분석되었습니다.
                  이는 대회에서 중요한 학점과 끈기 부분에서 높은점수를 보였기
                  때문입니다.
                </p>
                <div className="flex items-center mt-2">
                  <div className="w-20 h-4 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                  <p className="ml-2 text-lg font-bold">40%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 전체 분석 인공지능 그래프와 전체 확률 */}
        <div className="mt-10 flex justify-center flex-col">
          <img
            src="/imgs/graph.jpg"
            alt="전체 분석 그래프"
            className="mx-auto h-100"
          />
          <p className="text-3xl font-bold mt-4">전체 확률: 40%</p>
        </div>
      </div>
    </section>
  );
};

export default Conversation;
