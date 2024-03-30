import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PictureDetail from "../pages/PictureDetail";

export default function PictureCard({}) {
  const navigate = useNavigate();
  return (
    <Link
      to="/pictures/detail"
      className="rounded-lg shadow-md  cursor-pointer m-8 flex justify-center  transform hover:scale-105 transition  ease-in-out flex-col"
    >
      <img
        src="https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/v2ce2510126f0ef15e82906ced41e86e84.jpg?alt=media&token=86fa46c0-1140-41c8-9951-176dd51bbebe"
        alt="Your Image Description"
        className="w-full object-cover object-center p-4 h-[284px]"
      ></img>
      <div className="flex justify-center p-4">
        {" "}
        제11회 산업안전보건 조사자료 논문 경진대회
      </div>
      <div className="flex justify-center p-4"> 2024.4.1</div>
    </Link>
  );
}
