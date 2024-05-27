import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";

export default function PictureCard({ video }) {
  const [liked, setLiked] = useState(false);
  const formattedDate = format(new Date(video.created), "yyyy-MM-dd");

  useEffect(() => {
    checkLikedStatus(); // 컴포넌트가 처음으로 렌더링될 때 한 번만 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 호출

  const checkLikedStatus = async () => {
    try {
      const userToken = Cookies.get("csrftoken") || "";
      const axiosInstance = axios.create({
        withCredentials: true,
        headers: {
          "X-CSRFToken": userToken,
        },
      });

      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/users/me/favs/"
      );

      const isLiked = response.data.some((fav) => fav.id === video.id);
      setLiked(isLiked);
    } catch (error) {
      console.error("Error checking liked status:", error);
    }
  };

  const toggleLike = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const contestId = video.id;
      const newLiked = !liked;
      setLiked(newLiked); // 좋아요 상태를 먼저 업데이트

      const userToken = Cookies.get("csrftoken") || "";
      const axiosInstance = axios.create({
        withCredentials: true,
        headers: {
          "X-CSRFToken": userToken,
        },
      });

      // 서버로 좋아요 상태를 전송합니다.
      await axiosInstance.put("http://127.0.0.1:8000/users/me/favs/", {
        id: contestId,
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      // 에러 처리 로직 추가
    }
  };

  return (
    <Link
      to={`/pictures/${video.id}`}
      className="rounded-lg shadow-md cursor-pointer m-8 flex justify-center transform hover:scale-105 transition ease-in-out flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="absolute top-2 right-2 text-red-500 cursor-pointer"
        onClick={toggleLike}
      >
        {liked ? (
          <FaHeart className="text-4xl text-red-500" />
        ) : (
          <FaRegHeart className="text-4xl" />
        )}
      </div>
      <img
        src={video.사진}
        alt="Your Image Description"
        className="w-full object-cover object-center p-4 h-[354px]"
      ></img>
      <div
        className="flex justify-center p-2 text-xl "
        style={{ fontFamily: "Danjo-bold-Regular" }}
      >
        {" "}
        {video.제목}
      </div>
      <div
        className="flex justify-center p-2 "
        style={{ fontFamily: "BookkMyungjo-Bd" }}
      >
        분야: {video.분야}
      </div>
      <div
        className="flex justify-center p-2"
        style={{ fontFamily: "BookkMyungjo-Bd" }}
      >
        마감기한: {formattedDate}
      </div>
      <div
        className="flex justify-center p-2"
        style={{ fontFamily: "BookkMyungjo-Bd" }}
      >
        상금: {video.상금}
      </div>
    </Link>
  );
}
