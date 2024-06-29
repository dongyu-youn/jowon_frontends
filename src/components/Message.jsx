import React from "react";
import Conversation from "./Conversation";
import TeamButton from "./TeamButton";
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

  let processedUserData = userData || [];

  if (processedUserData.length > 0) {
    // "c언어와 실습(실습조)" 팀만 별도로 추출하여 순위를 매김
    const cLanguageTeams = processedUserData.filter(
      (team) => team.teamName === "c언어와 실습(실습조)"
    );
    cLanguageTeams.sort((a, b) => b.score - a.score); // 점수(score)를 기준으로 내림차순 정렬

    // 순위 부여
    cLanguageTeams.forEach((team, index) => {
      team.rank = index + 1; // 1위부터 시작
    });

    // 나머지 팀들과 병합
    const otherTeams = processedUserData.filter(
      (team) => team.teamName !== "c언어와 실습(실습조)"
    );
    processedUserData = [...cLanguageTeams, ...otherTeams];
  }

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
        {processedUserData &&
          processedUserData.map((video) => (
            <TeamButton
              key={video.id}
              data={video}
              teamName={video.teamName}
              image={video.image}
              rank={video.rank} // rank 전달
            />
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
