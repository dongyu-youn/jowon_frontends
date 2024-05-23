import React from "react";

import Conversation from "./Conversation";
import TeamButton from "./TeamButton";
import { CardFooter } from "@chakra-ui/react";
import { useQueryClient, useQuery } from "react-query"; // 변경된 부분
import axios from "axios";

const Message = () => {
  const queryClient = useQueryClient(); // 변경된 부분

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const {
    isLoading,
    error,
    data: userData,
  } = useQuery(["userData"], async () => {
    try {
      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/conversations/"
      );
      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  });
  console.log(userData);

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
            src="/videos/jown.jpeg"
            alt="Your Image Description"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-black text-5xl font-serif">
            Team's talking
          </h1>
        </div>
      </div>

      <div className="grid-container justify-center">
        {isLoading && <p>Loading...</p>}
        {error && <p>Something is wrong...</p>}
        {userData &&
          userData.map((video) => (
            <TeamButton key={video.id} data={video} teamName={video.teamName} />
          ))}
      </div>

      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* 3열 그리드 */
          gap: 8px; /* 그리드 아이템 간의 간격 */
          justify-items: center; /* 그리드 아이템을 중앙에 정렬 */
        }
      `}</style>
    </section>
  );
};

export default Message;
