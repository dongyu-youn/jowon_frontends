import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

export default function PictureCard({ video }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 이미 좋아요한 동영상인지 확인
    checkLikedStatus();
  }, []);

  const checkLikedStatus = async () => {
    const userToken = Cookies.get("csrftoken") || "";

    const axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "X-CSRFToken": userToken,
      },
    });
    try {
      // 좋아요 상태를 확인하는 요청을 보냄
      const response = await axiosInstance(
        "http://127.0.0.1:8000/users/me/favs/"
      );
      // 동영상 ID가 있는지 확인
      const isLiked = response.data.some((fav) => fav.id === video.id);
      // 좋아요 상태를 업데이트
      setLiked(isLiked);
    } catch (error) {
      console.error("Error checking liked status:", error);
    }
  };

  const toggleLike = async (e) => {
    e.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 함
    e.preventDefault();

    try {
      // 클라이언트에서 좋아요 상태를 토글하면서 백엔드로 전송할 대회의 ID
      const contestId = video.id;

      // 좋아요 상태를 토글합니다.
      const newLiked = !liked;
      setLiked(newLiked); // 새로운 좋아요 상태를 설정

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

      // 좋아요 상태를 확인하여 다시 설정합니다.
      checkLikedStatus();
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
        className="w-full object-cover object-center p-4 h-[284px]"
      ></img>
      <div className="flex justify-center p-4"> {video.제목}</div>
      <div className="flex justify-center p-4">연관학과: {video.연관학과}</div>
      <div className="flex justify-center p-4">상금: {video.상금}</div>
    </Link>
  );
}
