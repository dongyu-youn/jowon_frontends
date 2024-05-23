import React from "react";

import { Avatar, Button } from "@chakra-ui/react";
import Avartar from "./Avatar";
import NotiAvatar from "./NotiAvatar";

export default function NotiCard({ video, onClick }) {
  return (
    <div
      onClick={onClick}
      className="profile rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      <div>
        <div className="avatar">
          <img src={video.image} />
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-4">
        {" "}
        {video.message.length > 10
          ? `${video.message.slice(0, 10)}... 팀이 생성되었습니다`
          : video.message}
      </h1>
      {/* <p className="text-lg text-gray-600">{video.연관학과}</p> */}
      <div className="space-x-2 mt-2">
        {/* 제목의 길이가 10자 이상이면 버튼 숨기기 */}
        {video.message.length >= 10 ? null : (
          <>
            {/* 수락 버튼 */}
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              수락
            </button>
            {/* 거절 버튼 */}
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              거절
            </button>
          </>
        )}
      </div>
    </div>
  );
}
