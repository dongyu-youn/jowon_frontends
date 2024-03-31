import React from "react";
import { Link } from "react-router-dom";

const TeamButton = ({ data, teamName }) => {
  // data로부터 팀 이름과 프로필 데이터를 추출합니다.
  const { participants } = data;

  return (
    <Link to="/pictures/conversations" className="mr-4">
      <div className="flex flex-col items-center">
        <button className="w-1/2 bg-white text-black px-4 py-2 rounded-lg mt-4 flex items-center">
          <div className="flex ">
            {participants.map((participant, index) => (
              <div key={index}>
                <img
                  src={participant.avatar}
                  className="w-16 h-16 rounded-full p-1"
                />
              </div>
            ))}
          </div>
          <p className="p-8 font-diphylleia-bold text-2xl">{teamName}</p>
        </button>
        {/* 각 프로필 데이터를 기반으로 프로필을 렌더링합니다. */}
      </div>
    </Link>
  );
};

export default TeamButton;
