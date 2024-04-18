import React from "react";

import Conversation from "./Conversation";
import TeamButton from "./TeamButton";
import { CardFooter } from "@chakra-ui/react";

const Message = () => {
  // Conversation 컴포넌트에서 사용할 데이터 정의
  const conversationData = {
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
    <section id="home" className="overflow-y-auto">
      <div className="relative w-full" style={{ paddingBottom: "40%" }}>
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

      <div className="   flex justify-center    ">
        <TeamButton data={conversationData} teamName="1조원" />
        <TeamButton data={conversationData} teamName="2조원" />
        <TeamButton data={conversationData} teamName="3조원" />
      </div>
    </section>
  );
};

export default Message;
