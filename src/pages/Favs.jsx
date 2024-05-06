import React from "react";

import { Link, useNavigate } from "react-router-dom";
import PictureDetail from "../pages/PictureDetail";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // 좋아요와 비좋아요 아이콘을 가져옴
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { useQueryClient, useQuery } from "react-query"; // 변경된 부분
import PictureCard from "../components/PictureCard";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function Favs() {
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
        "http://127.0.0.1:8000/users/me/favs/"
      );
      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  });
  console.log(userData);
  return (
    <div className="bg-white text-black p-12">
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Something is wrong...</p>}
        {userData && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4 ">
            {userData.map((video) => (
              <PictureCard key={video.id} video={video}></PictureCard>
            ))}

            <div className="flex items-center justify-center blinking-text ">
              <h1 className="text-3xl mb-2 font-diphylleia ">more</h1>
              <IoIosArrowRoundBack className="text-3xl ml-1 font-diphylleia " />{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
