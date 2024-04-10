import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function PictureAbc() {
  const location = useLocation();
  console.log("Location state:", location.state);
  const video = location.state ? location.state.video : null;

  if (!video) {
    return <div>Loading...</div>; // 또는 다른 처리 방법
  }

  // 받은 상태 정보 사용하기
  return (
    <div>
      <h1>Picture Detail</h1>
      <p>Video: {video.제목}</p>
      {/* 이하 내용 추가 */}
    </div>
  );
}
