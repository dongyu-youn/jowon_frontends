import React from "react";

import { Link, useNavigate } from "react-router-dom";
import PictureDetail from "./PictureDetail";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // 좋아요와 비좋아요 아이콘을 가져옴
import axios from "axios";
import Cookies from "js-cookie";

import { useQueryClient, useQuery } from "react-query"; // 변경된 부분
import PictureCard from "../components/PictureCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import Profile from "./Profile";
import ProfileCard from "../components/ProfileCard";
import Avartar from "../components/Avatar";
import Footer from "../components/Footer";
import NotiCard from "../components/NotiCard";

export default function Notifications() {
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);
  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });
  const {
    isLoading,
    error,
    data: userData,
  } = useQuery(["userData"], async () => {
    try {
      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/notifications/"
      );
      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  });
  console.log(userData);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="bg-white text-black p-12">
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Something is wrong...</p>}
        {userData && (
          <div className="grid grid-cols-3 gap-8 mt-24">
            {userData.map((video) => (
              <div key={video.id}>
                <NotiCard
                  onClick={() => handleClick(video.user)}
                  video={video}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
