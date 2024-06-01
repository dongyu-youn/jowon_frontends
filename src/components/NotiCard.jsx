import React from "react";

import { Avatar, Button } from "@chakra-ui/react";
import Avartar from "./Avatar";
import NotiAvatar from "./NotiAvatar";
import { useLocation } from "react-router-dom";

export default function NotiCard({ video, onClick, isLoading }) {
  const location = useLocation();

  return (
    <div
      onClick={onClick}
      className="profile relative rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
          <p>생성 중입니다...</p>
        </div>
      )}
      <div className={isLoading ? "filter blur-sm" : ""}>
        <div className="avatar">
          <img src={video.image} alt="avatar" />
        </div>
        <h1 className="text-2xl font-bold mt-4">
          {video.message.length > 10
            ? `${video.message.slice(0, 10)}... 팀이 생성되었습니다`
            : video.message}
        </h1>
        <div className="space-x-2 mt-2">
          {!isLoading && video.message.length >= 10 ? null : (
            <>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                수락
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                거절
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
