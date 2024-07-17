import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import { format } from "date-fns";

export default function PictureCard({ video }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // video 객체가 undefined일 때 대체 값 사용
  const createdDate = video?.created ? new Date(video.created) : new Date();
  const formattedDate = format(createdDate, "yyyy-MM-dd");

  useEffect(() => {
    let isMounted = true; // 컴포넌트가 마운트되어 있는지 확인하기 위한 플래그
    checkLikedStatus(isMounted);

    return () => {
      isMounted = false; // 언마운트 시 플래그를 false로 설정
    };
  }, [video.id]); // video.id가 변경될 때만 useEffect 실행

  const checkLikedStatus = async (isMounted) => {
    try {
      const cachedStatus = localStorage.getItem(`liked_${video.id}`);
      if (cachedStatus !== null) {
        setLiked(JSON.parse(cachedStatus));
        setLoading(false);
        return;
      }

      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/users/me/favs/"
      );
      if (isMounted) {
        const isLiked = response.data.some((fav) => fav.id === video.id);
        setLiked(isLiked);
        localStorage.setItem(`liked_${video.id}`, JSON.stringify(isLiked));
        setLoading(false); // 로딩 상태 해제
      }
    } catch (error) {
      if (isMounted) {
        console.error("Error checking liked status:", error);
        setLoading(false); // 로딩 상태 해제
      }
    }
  };

  const toggleLike = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const newLiked = !liked;
      setLiked(newLiked); // Optimistic UI update
      localStorage.setItem(`liked_${video.id}`, JSON.stringify(newLiked));

      await axiosInstance.put("http://127.0.0.1:8000/users/me/favs/", {
        id: video.id,
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      setLiked(!liked); // 에러 발생 시 상태 롤백
      localStorage.setItem(`liked_${video.id}`, JSON.stringify(!liked));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Link
      to={`/pictures/${video?.id}`}
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
        src={video?.사진 || ""}
        alt="Your Image Description"
        className="w-full object-cover object-center p-4 h-[404px]"
      ></img>
      <div className="flex justify-center p-2 text-xl font-bold">
        {video?.제목 || "제목 없음"}
      </div>
      <div className="flex justify-center p-2 font-serif">
        분야: {video?.분야 || "분야 없음"}
      </div>
      <div className="flex justify-center p-2 font-serif">
        마감기한: {formattedDate}
      </div>
      <div className="flex justify-center p-2 font-serif">
        상금: {video?.상금 || "상금 없음"}
      </div>
    </Link>
  );
}
