import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PictureDetail from "../pages/PictureDetail";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // 좋아요와 비좋아요 아이콘을 가져옴
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import PictureCard from "../components/PictureCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import getAxiosInstance from "../utils/axiosInstance"; // 수정된 부분

export default function Favs() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const axiosInstance = await getAxiosInstance(); // Axios 인스턴스 생성
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/users/me/favs/"
        );
        setUserData(response.data);
      } catch (error) {
        setError("Network response was not ok");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  console.log(userData);

  return (
    <div className="bg-white text-black p-12 flex flex-col justify-center items-center">
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong...</p>}
      {userData && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4 ">
          {userData.map((video) => (
            <PictureCard key={video.id} video={video}></PictureCard>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center blinking-text mt-4">
        <h1 className="text-3xl mb-2 font-diphylleia">More</h1>
        <IoIosArrowRoundBack className="text-3xl ml-1 font-diphylleia" />
      </div>
    </div>
  );
}
