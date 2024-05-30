import React from "react";

import { Avatar, Button } from "@chakra-ui/react";
import Avartar from "./Avatar";
import NotiAvatar from "./NotiAvatar";

export default function NotiCard({ video, onClick, isLoading }) {
  return (
    <div
      onClick={onClick}
      className="profile rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div>
            <div className="avatar">
              <img src={video.image} alt="avatar" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4">
            {video.message.length > 10
              ? `${video.message.slice(0, 10)}... 팀이 생성되었습니다`
              : video.message}
          </h1>
          <div className="space-x-2 mt-2">
            {isLoading && <p>Loading...</p>}
            {video.message.length >= 10 ? null : (
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
        </>
      )}
    </div>
  );
}
