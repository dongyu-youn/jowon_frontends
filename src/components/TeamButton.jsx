import React from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

const TeamButton = ({ data, teamName, image }) => {
  const { participants } = data;
  console.log(data);

  return (
    <Link
      to={`/pictures/conversations/${data.id}`}
      className="flex mr-8 mt-16 mb-16 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition ease-in-out w-96 h-auto text-black bg-white relative"
    >
      {/* 이미지 */}
      {image && (
        <div className="w-full bg-cover bg-center rounded-l-lg">
          <img
            src={image}
            alt={`${teamName} 이미지`}
            className="w-full h-full rounded-l-lg"
          />
        </div>
      )}

      {/* 컨텐츠 */}
      <div className="flex flex-col justify-between p-4 w-full">
        {/* 이미지가 아닌 내용 */}
        <div>
          {/* 팀 이름 */}
          <p
            className="font-diphylleia-bold text-xl"
            style={{ fontFamily: "BookkMyungjo-Bd" }}
          >
            {teamName.length > 30
              ? `${teamName.substring(0, 30)}...`
              : teamName}
          </p>
          {/* Participants 표시 */}
          <div
            className="border-t border-gray-200 bg-gray-500 p-8 mt-8 mb-8"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            {participants.map((participant, index) => (
              <div key={index} className="flex items-center ">
                <p className="" style={{ fontFamily: "BookkMyungjo-Bd" }}>
                  {participant.username}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TeamButton;
