import React, { useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useQueryClient, useQuery } from "react-query";
import axios from "axios";
import StarRatingModal from "./StarRatingModal";
import Cookies from "js-cookie";
import MessageModal from "./MessageModal";

const StarRating = ({ totalStars, yellowStars }) => {
  // Ensure totalStars and yellowStars are valid integers
  totalStars = Number.isInteger(totalStars) && totalStars > 0 ? totalStars : 5;
  yellowStars = Math.round(yellowStars);
  const greyStars = totalStars - yellowStars;

  return (
    <div className="flex">
      {[...Array(yellowStars)].map((_, index) => (
        <span key={index} className="text-yellow-500">
          ★
        </span>
      ))}
      {[...Array(greyStars)].map((_, index) => (
        <span key={index} className="text-gray-400">
          ★
        </span>
      ))}
    </div>
  );
};

export default function UserDetail() {
  const queryClient = useQueryClient();
  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  const handleProposal = async () => {
    setIsModalOpenB(true);
  };

  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  const {
    isLoading,
    error,
    data: userData,
  } = useQuery(["userData"], async () => {
    try {
      const response = await axiosInstance.get(
        `http://127.0.0.1:8000/users/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [isModalOpenB, setIsModalOpenB] = useState(false);

  const handleSaveRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <>
      <section className="flex flex-col md:flex-row p-4 items-center justify-center ">
        {isLoading && <p>Loading...</p>}
        {error && <p>Something is wrong...</p>}
        {userData && (
          <>
            <div className="w-1/5 px-20 basis-7/12 mb-30 flex items-center justify-center">
              <img src={userData.avatar} className="h-full object-cover " />
            </div>
            <div className="w-full basis-8/12 flex flex-col p-4 text-left mt-36">
              <div className="flex items-center py-1 mb-12">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  이름
                </span>
                <span className="text-2xl font-dongle_light  w-2/3 ">
                  {userData.username}
                </span>
              </div>

              <div className="flex items-center  mb-12">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  신뢰도
                </span>
                <span className="text-2xl font-dongle_light  w-2/3 ">
                  <StarRating
                    totalStars={userData.average_rating}
                    yellowStars={userData.average_rating}
                  />
                </span>
              </div>

              <div className="flex items-center  mb-12">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  분야
                </span>
                <span className="text-2xl font-dongle_light  w-2/3 ">
                  {userData.개발경력}
                </span>
              </div>

              <div className="flex items-center  mb-12">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  총획득상금
                </span>
                <span className="text-2xl font-dongle_light  w-2/3 ">
                  227만원
                </span>
              </div>

              <div className="flex items-center  mb-12">
                <span className="text-2xl font-dongle_light w-1/3 mr-28">
                  수상 4
                </span>
                <div className="flex flex-col">
                  <div className="text-2xl font-dongle_light   ">
                    2024 | 코딩공모전 금상
                  </div>
                  <div className="text-2xl font-dongle_light   ">
                    2023 | 알고리즘대회 금상
                  </div>
                  <div className="text-2xl font-dongle_light   ">
                    2022 | 전국ai대회 금상
                  </div>
                  <div className="text-2xl font-dongle_light   ">
                    2022 | 전국 크리에어터대회 금상
                  </div>
                </div>
              </div>

              <div className="flex items-center py-2 mb-12">
                <span className="text-2xl font-dongle_light w-1/2 mr-24">
                  자기소개
                </span>
                <span className="text-lg font-dongle_light ">
                  저는 풀스택 개발자 윤동규입니다. ~ 대회, ~대회,...등 4번의
                  대회를 나가 8번의 수상을 하였고, 개발 경력은 2년입니다. ~~~
                  기술등을 할 줄 아며, 같이 대회 나가고 싶으신 분들은
                  제의바랍니다.
                </span>
              </div>

              <Button
                className="mt-20"
                text="제의하기"
                onClick={handleProposal}
              ></Button>
              <Button
                className="mt-20"
                text="별점주기"
                onClick={() => setIsModalOpen(true)}
              ></Button>
            </div>
          </>
        )}
      </section>
      <Footer />
      <MessageModal
        isOpen={isModalOpenB}
        onClose={() => setIsModalOpenB(false)}
        onSubmit={() => {
          setIsModalOpenB(false);
        }}
      />
      <StarRatingModal
        rateeId={id}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onSave={handleSaveRating}
      />
    </>
  );
}
