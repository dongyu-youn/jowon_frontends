import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PictureDetail from "../pages/PictureDetail";

export default function PictureCard({ video }) {
  return (
    <Link
      to={`/pictures/${video.id}`} // 여기에서 id 값을 전달
      className="rounded-lg shadow-md  cursor-pointer m-8 flex justify-center  transform hover:scale-105 transition  ease-in-out flex-col"
    >
      <img
        src={video.사진}
        alt="Your Image Description"
        className="w-full object-cover object-center p-4 h-[284px]"
      ></img>
      <div className="flex justify-center p-4"> {video.제목}</div>
      <div className="flex justify-center p-4">{video.연관학과}</div>
      <div className="flex justify-center p-4">{video.상금}</div>
      <div className="flex justify-center p-4">{video.분야}</div>
      <div className="flex justify-center p-4">{video.위치}</div>
      <div className="flex justify-center p-4">{video.참고링크}</div>
    </Link>
  );
}
