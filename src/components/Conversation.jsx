import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { FaFile } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
const Conversation = () => {
  const [isExpanded, setIsExpanded] = useState(true); // 섹션의 확장 상태를 관리합니다.
  const [isThirdExpanded, setIsThirdExpanded] = useState(true); // 세 번째 섹션의 확장 상태를 관리합니다.

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

  return (
    <section id="home" className="">
      <div className="relative w-full h-0" style={{ paddingBottom: "40%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/imgs/pic.jpg"
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
            {conversation.participants.map((user, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="rounded-full w-16 h-16"
                />
                <span
                  className={`mt-2 text-gray-500 ${
                    user.id === 1 ? "text-black" : ""
                  }`}
                >
                  {user.first_name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="border flex-grow ml-10 p-10 flex flex-col">
          <div className="border mb-6 flex items-center justify-center rounded  p-2">
            제2회 통신망 안정성 확보를 위한 인공지능 해커톤
          </div>
          {conversation.messages.map((message, index) => (
            <div
              key={index}
              className={`mb-10 flex items-center ${
                message.user.id !== 1 ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full   ml-4 ${
                  message.user.id !== 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {message.user.first_name.substring(0, 1)}
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
            />
            <button className="bg-teal-500 text-white py-2  px-8 items-center rounded focus:outline-none flex">
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
    </section>
  );
};

export default Conversation;
