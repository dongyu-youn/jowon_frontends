import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@chakra-ui/react";
import Avartar from "./Avatar";
import NotiAvatar from "./NotiAvatar";
import { useLocation } from "react-router-dom";

export default function NotiCard({ video, onClick, isLoading }) {
  const location = useLocation();
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 수락 상태 불러오기
    const acceptedState = localStorage.getItem(`isAccepted-${video.id}`);
    if (acceptedState) {
      setIsAccepted(JSON.parse(acceptedState));
    }
  }, [video.id]);

  const handleAccept = () => {
    // 수락 상태 업데이트 및 로컬 스토리지에 저장
    setIsAccepted(true);
    localStorage.setItem(`isAccepted-${video.id}`, true);
  };

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
          <img
            src={
              video.image ||
              "https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/%EC%82%AC%EB%9E%8C2.jpg?alt=media&token=d4eab5aa-80b4-4214-b861-b05f2fcd009f"
            }
            alt="avatar"
          />
        </div>
        <h1 className="text-2xl font-bold mt-4">
          {video.message.length > 10
            ? `${video.message.slice(0, 10)}... 팀이 생성되었습니다`
            : video.message}
        </h1>
        {/* 수락 상태가 false이고 메시지 길이가 10 이상일 때만 버튼 섹션을 렌더링 */}
        {!isAccepted && (
          <div className="space-x-2 mt-2">
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              수락
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              거절
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
