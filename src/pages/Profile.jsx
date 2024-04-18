import React, { useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useQueryClient, useQuery } from "react-query"; // 변경된 부분

import axios from "axios";

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

export default function Profile({ id }) {
  console.log(id);
  const queryClient = useQueryClient(); // 변경된 부분

  const {
    isLoading,
    error,
    data: a,
  } = useQuery(["a"], async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/users/1");
      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  });
  console.log(a);

  return (
    <>
      <section className="flex flex-col md:flex-row p-4 items-center justify-center">
        {isLoading && <p>Loading...</p>}
        {error && <p>Something is wrong...</p>}
        {a && (
          <>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/KakaoTalk_Photo_2024-04-01-14-36-50.jpeg?alt=media&token=5b2fac95-0dbd-40c1-a030-a58336997c24"
              className="w-1/6 px-20 basis-7/12"
            />

            <div className="w-full basis-5/12 flex flex-col p-4">
              <h2 className="text-4xl font-bold py-2 mb-12 font-dongle_semibolde">
                {a.이름}
              </h2>
              <p className="text-2xl font-bold py-2  mb-4 font-dongle">
                {a.학과}
              </p>
              <p className="text-2xl font-bold py-2 mb-8 font-dongle">
                총 획득 상금 : 2000000 / 올해 예상 상금 : 3000000
              </p>

              <p className="py-4 text-2xl  border-b border-gray-400 mb-12 font-dongle_light">
                분야 : 프론트엔드 개발자
              </p>
              <p className=" flex items-center justify-center py-4 text-2xl  border-b border-gray-400 mb-12 font-dongle_light">
                신뢰도 : <StarRating totalStars={5} />
              </p>

              <Button className="mt-20" text="제의하기"></Button>
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
