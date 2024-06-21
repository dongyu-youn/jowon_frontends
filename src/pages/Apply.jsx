import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import Footer from "../components/Footer";

export default function Apply() {
  const [predictions, setPredictions] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const contestId = pathname.substring(pathname.lastIndexOf("/") + 1);
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
        `http://127.0.0.1:8000/contests/${contestId}/applicants/`
      );
      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  });

  useEffect(() => {
    if (!isLoading && userData && userData.length > 0) {
      const fetchPredictions = async () => {
        const newPredictions = [];
        for (const user of userData) {
          const studentData = {
            grade: user.score.grade,
            github_commit_count: user.score.github_commit_count,
            baekjoon_score: user.score.baekjoon_score,
            programmers_score: user.score.programmers_score,
            certificate_count: user.score.certificate_count,
            senior: user.score.senior,
            depart: user.score.depart,
            courses_taken: user.score.courses_taken,
            major_field: user.score.major_field,
            bootcamp_experience: user.score.bootcamp_experience,
            in_school_award_cnt: user.score.in_school_award_cnt,
            out_school_award_cnt: user.score.out_school_award_cnt,
            coding_test_score: user.score.coding_test_score,
            certificate_score: user.score.certificate_score,

            aptitude_test_score: user.score.aptitude_test_score,
          };

          // 인공지능 모델 실행 전 데이터 확인
          const requestData = {
            students: studentData,
          };
          console.log(
            "Request Data for AI model:",
            JSON.stringify(requestData, null, 2)
          );

          try {
            const response = await axios.post(
              "http://127.0.0.1:8000/users/students/predict/",
              studentData
            );
            newPredictions.push({
              user_id: user.id,
              user_name: user.username, // Assuming `username` is available in user data
              avatar: user.avatar, // 프로필 이미지도 함께 포함
              department: user.department, // Assuming `department` is available in user data
              predictions: response.data,
            });
          } catch (error) {
            console.error("예측 요청 중 오류 발생:", error);
          }
        }

        // "GCGF 혁신 아이디어 공모" 예측값 기준으로 정렬
        newPredictions.sort(
          (a, b) =>
            b.predictions["GCGF 혁신 아이디어 공모"] -
            a.predictions["GCGF 혁신 아이디어 공모"]
        );
        console.log(newPredictions);
        setPredictions(newPredictions);
      };

      fetchPredictions();
    }
  }, [isLoading, userData]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="bg-white text-black p-12">
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {userData && userData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {predictions.map((prediction) => (
              <div key={prediction.user_id} className="p-12">
                <ProfileCard
                  onClick={() => handleClick(prediction.user_id)}
                  image={prediction.avatar} // 사용자 프로필 이미지 사용
                  user={{
                    user_name: prediction.user_name,
                    department: prediction.department,
                  }} // 사용자 이름과 학과 정보
                  isNew={true}
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
