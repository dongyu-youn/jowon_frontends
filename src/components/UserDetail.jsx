import React, { useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useQueryClient, useQuery } from "react-query"; // 변경된 부분

import axios from "axios";
import StarRatingModal from "./StarRatingModal";
import Cookies from "js-cookie";
import MessageModal from "./MessageModal";

const StarRating = ({ totalStars }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex justify-center p-2">
      {[...Array(totalStars)].map((_, index) => (
        <FaStar
          key={index}
          size={24}
          onClick={() => setRating(index + 1)}
          color={index < rating ? "#ffc107" : "#e4e5e9"}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
};

export default function UserDetail({}) {
  console.log();
  const queryClient = useQueryClient(); // 변경된 부분

  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  const handleProposal = async () => {
    setIsModalOpenB(true); // 제의하기 버튼 클릭 시 모달 열기
  };

  const StarRating = ({ totalStars, yellowStars }) => {
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
  console.log(userData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const [isModalOpenB, setIsModalOpenB] = useState(false); // 모달 상태 변수

  const handleSaveRating = (newRating) => {
    // 여기서 별점 저장 로직을 구현하면 됩니다.
    setRating(newRating);
  };

  return (
    <>
      <section className="flex flex-col md:flex-row p-4 items-center justify-center  ">
        {isLoading && <p>Loading...</p>}
        {error && <p>Something is wrong...</p>}
        {userData && (
          <>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/KakaoTalk_Photo_2024-04-01-14-36-50.jpeg?alt=media&token=5b2fac95-0dbd-40c1-a030-a58336997c24"
              className="w-1/6 px-20 basis-7/12"
            />

            <div className="w-full basis-5/12 flex flex-col p-4 mt-24">
              <h2 className="text-4xl font-bold py-2 mb-12 font-dongle_semibolde">
                {userData.username}
              </h2>
              <p className="py-4 text-2xl   mb-12 font-dongle_light">
                분야 : {userData.개발경력}
              </p>
              <p className="flex items-center justify-center py-4 text-2xl mb-12 font-dongle_light">
                신뢰도 :
                <StarRating
                  totalStars={userData.average_rating}
                  yellowStars={userData.average_rating}
                />
              </p>
              <p className="text-2xl font-bold py-2  mb-4 font-dongle"></p>
              <p className="text-2xl font-bold py-2 mb-8 font-dongle">
                총 획득 상금 : 200만원
              </p>

              <p className="text-2xl font-bold py-2 mb-8 font-dongle">
                올해 예상 상금 : 300만원
              </p>

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
          // 쿼리 다시 불러오기 등의 작업 수행
        }}
      />
      <StarRatingModal
        id={id}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onSave={handleSaveRating}
      />
    </>
  );
}