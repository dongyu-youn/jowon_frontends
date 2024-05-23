import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const TeamButton = ({ data, teamName }) => {
  // data로부터 팀 이름과 프로필 데이터를 추출합니다.
  const { participants } = data;

  const [expanded, setExpanded] = useState(false);

  const handleIconClick = (e) => {
    e.preventDefault(); // 클릭 이벤트의 기본 동작을 막습니다.
    setExpanded(!expanded);
  };

  return (
    <Link
      to={`/pictures/conversations/${data.id}`}
      className={`flex flex-col mr-8 mt-16 mb-16 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition ease-in-out w-96 h-auto ${
        expanded ? "max-h-screen" : "h-52"
      } text-black bg-white `}
    >
      {/* 아바타와 팀 이름 */}
      <div className="flex items-center">
        <img className="w-16 h-16 rounded-full p-1 mr-4 mt-12 ml-4" />
        <div className="flex flex-col">
          <p className="font-diphylleia-bold text-xl mt-12 ml-4">{teamName}</p>
        </div>
      </div>

      {/* Participants 표시 */}

      {expanded && (
        <div className="border-t border-gray-200 mt-4  flex flex-col bg-gray-500 p-8">
          {participants.map((participant, index) => (
            <div key={index} className="flex items-center">
              <p>{participant.username}</p>
            </div>
          ))}
        </div>
      )}

      {/* 펼쳐보기 아이콘 */}
      <div className="mt-12 flex justify-end mr-4" onClick={handleIconClick}>
        {expanded ? (
          <FiChevronUp
            className="text-gray-600 hover:text-pink-800"
            size={40}
          />
        ) : (
          <FiChevronDown
            className="text-gray-600 hover:text-pink-800"
            size={40}
          />
        )}
      </div>
    </Link>
  );
};

export default TeamButton;
