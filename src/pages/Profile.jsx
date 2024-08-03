import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa";
import { useQueryClient, useQuery } from "react-query"; // 변경된 부분
import Cookies from "js-cookie";
import axios from "axios";
import NotiMe from "../components/NotiMe";
import { useNavigate } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import getAxiosInstance from "../utils/axiosInstance"; // 수정된 부분

const StarRating = ({ totalStars = 5, yellowStars = 0 }) => {
  totalStars = Number.isInteger(totalStars) && totalStars > 0 ? totalStars : 5;
  yellowStars =
    Number.isInteger(yellowStars) && yellowStars >= 0 ? yellowStars : 0;

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

export default function Profile() {
  const [percentages, setPercentages] = useState({});
  const [score, setScore] = useState({});
  const queryClient = useQueryClient(); // 변경된 부분
  const userToken = Cookies.get("csrftoken") || "";

  const axiosInstance = getAxiosInstance();

  const {
    isLoading,
    error,
    data: userData,
  } = useQuery(["userData"], async () => {
    try {
      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/users/me/"
      );
      setScore(response.data.score); // score 정보를 상태에 저장
      console.log(response.data.average_rating);
      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  });

  const handleLinkClick = () => {
    navigate("/profile/form");
  };

  useEffect(() => {
    if (Object.keys(score).length > 0) {
      calculateAverages();
    }
  }, [score]);

  const calculateAverages = () => {
    const performanceAverage =
      (
        (score.grade +
          score.github_commit_count +
          score.baekjoon_score +
          score.programmers_score +
          score.certificate_count) /
        5
      ).toFixed(2) * 10;

    const experienceAverage =
      (
        (score.depart +
          score.courses_taken +
          score.major_field +
          score.bootcamp_experience) /
        4
      ).toFixed(2) * 100;

    const resultAverage =
      (
        (score.in_school_award_cnt +
          score.out_school_award_cnt +
          score.coding_test_score +
          score.certificate_score +
          score.aptitude_test_score) /
        5
      ).toFixed(2) * 50;

    setPercentages({
      performance: performanceAverage,
      experience: experienceAverage,
      result: resultAverage,
      trust: userData.average_rating * 50, // 신뢰도 값을 100으로 설정
      creativity: 150, // 창의성 값을 100으로 설정
    });
  };

  const data = {
    labels: ["성과", "성실도", "경험", "신뢰도", "창의성"],
    datasets: [
      {
        label: "내 데이터",
        data: [
          percentages.result,
          percentages.performance,
          percentages.experience,
          percentages.trust,
          percentages.creativity,
        ],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "평균 데이터",
        data: [180, 200, 100, 120, 120], // 평균 데이터는 항상 100%로 설정합니다.
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  console.log(score);
  console.log(percentages);

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        grid: {
          color: "#fff", // 레이더 그리드의 색상을 흰색으로 설정
        },
        pointLabels: {
          display: true,
          fontSize: 24,
        },
        ticks: {
          beginAtZero: true,
        },
        pointLabels: {
          display: true,
          font: {
            size: 20, // 라벨 글자 크기를 24px로 설정합니다.
          },
        },
      },
    },
    layout: {
      padding: {
        top: 100, // 상단 패딩을 50px로 설정하여 그래프를 아래로 내립니다.
      },
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장하는 state
  const [isModalOpenB, setIsModalOpenB] = useState(false); // 모달 열림/닫힘 상태를 저장하는 state

  const navigate = useNavigate();

  const navigateToNotiME = () => {
    navigate("/notifications/me");
  };

  const [formData, setFormData] = useState({
    grade: "",
    depart: "",
    credit: "",
    in_school_award_cnt: "",
    out_school_award_cnt: "",
    national_competition_award_cnt: "",
    certificate: "",
    subject: "",
    major_field: "",
    codingTest_score: "",
  });

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달 열기 함수
  const openModalB = () => {
    setIsModalOpenB(true);
  };
  // 모달 닫기 함수
  const closeModalB = () => {
    setIsModalOpenB(false);
  }; // 모달 닫기 함수

  // 모달 바깥 클릭시 모달 닫기
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModalB();
    }
  };

  return (
    <>
      <section className="flex flex-col md:flex-row p-4 justify-center ">
        {isLoading && <p>Loading...</p>}
        {error && <p>Something is wrong...</p>}
        {userData && (
          <>
            <div className="w-1/4 px-20 basis-6/12 mt-8 mb-20 h-auto ">
              <img src={userData.avatar} className="" />
            </div>

            <div className="w-full basis-5/12 flex flex-col p-4 text-left  mb-8">
              <div className="flex items-center py-1 mb-8 ">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  이름
                </span>
                <span className="text-2xl font-dongle_light w-2/3 ">
                  {userData.username}
                </span>
              </div>

              <div className="flex items-center  mb-8">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  신뢰도
                </span>
                <span className="text-2xl font-dongle_light w-2/3 ">
                  <StarRating
                    totalStars={userData.average_rating}
                    yellowStars={userData.average_rating}
                  />
                </span>
              </div>

              <div className="flex items-center  mb-8">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  분야
                </span>
                <span className="text-2xl font-dongle_light w-2/3 ">
                  {userData.개발경력}
                </span>
              </div>

              <div className="flex items-center mb-8 ">
                <span className="text-2xl font-dongle_light w-1/3 mr-40">
                  총획득상금
                </span>
                <span className="text-2xl font-dongle_light w-2/3 ">
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
                    2023 | 알고리즘ap 금상
                  </div>
                  <div className="text-2xl font-dongle_light   ">
                    2022 | 전국ai대회 금상
                  </div>
                  <div className="text-2xl font-dongle_light   ">
                    2022 | 전국 crt 금상
                  </div>
                </div>
              </div>

              <div className="flex items-center py-2">
                <span className="text-2xl font-dongle_light w-1/3 mr-24">
                  자기소개
                </span>
                {/* 자기소개 보기 버튼 */}
                <button
                  className="text-2xl font-dongle_light text-blue-500 mr-12"
                  onClick={openModal}
                >
                  자기소개 보기
                </button>
              </div>
              <div className="mt-24">
                {" "}
                <span className="text-2xl font-dongle_light w-1/3 mr-24">
                  분포도
                </span>
                {userData && <Radar data={data} options={options} />}
              </div>

              <span className="flex justify-center ">
                <button
                  onClick={navigateToNotiME}
                  className="w-30 h-12 mr-8 bg-gray-500 font-diphylleia font-bold text-2xl text-white py-2 px-4 rounded-sm hover:brightness-110 mt-12 hover:bg-black"
                >
                  받은제의
                </button>

                <button
                  onClick={handleLinkClick}
                  className="w-30 h-12 mr-8 bg-gray-500 font-diphylleia font-bold text-2xl text-white py-2 px-4 rounded-sm hover:brightness-110 mt-12 hover:bg-black"
                >
                  프로필추가
                </button>
              </span>
              {/* 모달 */}
              {isModalOpen && (
                <div
                  className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75"
                  onClick={closeModal}
                >
                  <div
                    className="bg-white p-8 rounded-lg w-1/3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* 모달 닫기 버튼 */}
                    <button
                      className="absolute top-0 right-0 mr-4 mt-2 text-gray-500 hover:text-gray-700"
                      onClick={closeModal}
                    >
                      X
                    </button>
                    {/* 자기소개 내용 */}
                    <span className="text-lg font-dongle_light text-black">
                      안녕하세요. 저는 원대 컴퓨터 공학과에 재학 중인
                      윤동규입니다. 프로그래밍의 매력에 빠져들어 다양한
                      프로그래밍 언어와 알고리즘을 익히며 컴퓨터의 원리와 동작
                      메커니즘을 탐구하고 있습니다. 특히, 소프트웨어 개발과
                      관련된 과목에서 뛰어난 성적을 기록하며 높은 프로그래밍
                      실력을 가지고 있습니다. 또한, 이론뿐만 아니라 실무 경험
                      또한 쌓고자 학교 주변에서 다양한 인턴십과 프로젝트를
                      진행해왔습니다. 특히, 최근에는 개인 프로젝트나 경험를 통해
                      웹 개발 능력을 향상시켰습니다.. 그리고 개인 프로젝트 뿐만
                      아니라 팀 프로젝트 수상경험도 있습니다. 팀 프로젝트를 하며
                      조장을 맡었었습니다. 조장을 하며 팀을 이끌어 갈 수 있는
                      능력도 있다고 자신합니다.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
