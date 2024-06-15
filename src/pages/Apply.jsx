import React, { useEffect, useState } from "react";

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

export default function Apply() {
  const [predictions, setPredictions] = useState(null);

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
        `http://127.0.0.1:8000/contests/${id}/applicants/`
      );
      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  });
  console.log(userData);

  useEffect(() => {
    if (userData && userData.length > 0) {
      const fetchPredictions = async () => {
        const newPredictions = [];
        for (const user of userData) {
          const studentData = {
            grade: user.score.grade,
            depart: user.score.depart,
            credit: user.score.credit,
            in_school_award_cnt: user.score.in_school_award_cnt,
            out_school_award_cnt: user.score.out_school_award_cnt,
            national_competition_award_cnt:
              user.score.national_competition_award_cnt,
            aptitude_test_score: user.score.aptitude_test_score,
            certificate: user.score.certificate,
            major_field: user.score.major_field,
            codingTest_score: user.score.codingTest_score,
          };

          try {
            const response = await axios.post(
              "http://127.0.0.1:8000/users/students/predict/",
              studentData
            );
            newPredictions.push({
              user_id: user.id,
              user_name: user.이름,
              predictions: response.data,
            });
          } catch (error) {
            console.error("예측 요청 중 오류 발생:", error);
          }
        }
        setPredictions(newPredictions);
      };

      fetchPredictions();
    }
  }, [userData]);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
            {userData.map((video) => (
              <div key={video.id} className="p-12">
                <ProfileCard
                  onClick={() => handleClick(video.id)} // 여기에서 함수 참조 전달
                  image={video.avatar}
                  video={video}
                  isNew={true}
                ></ProfileCard>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
