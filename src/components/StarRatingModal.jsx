import React, { useState } from "react";
import Modal from "react-modal";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

const customStyles = {
  content: {
    width: "600px",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#fuchsia-800", // bg-pink-800 대신 fuchsia-800 사용
    color: "black",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  text: {
    color: "black",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

const StarRatingModal = ({ isOpen, closeModal, rateeId }) => {
  const [rating, setRating] = useState(0);
  const [activityScore, setActivityScore] = useState(0);
  const [accuracyScore, setAccuracyScore] = useState(0);
  const [teamworkScore, setTeamworkScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0);

  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/ratings/",
        {
          ratee: parseInt(rateeId),
          activity_score: activityScore,
          accuracy_score: accuracyScore,
          teamwork_score: teamworkScore,
          overall_score: overallScore,
        }
      );
      console.log("Rating saved successfully.");
    } catch (error) {
      console.error("Error saving rating:", error);
    }
    closeModal();
  };

  const renderStars = (currentScore, setScore) => (
    <div className="flex justify-center p-2">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          size={24}
          onClick={() => setScore(index + 1)}
          color={index < currentScore ? "#ffc107" : "#e4e5e9"}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="평가하기"
      isTopMost={true}
    >
      <h2 style={customStyles.text}>평가하기</h2>

      <div className="w-full">
        <div className="flex justify-between items-center">
          <span style={customStyles.text}>
            팀원은 팀활동을 성실히 수행했습니까?
          </span>
          {renderStars(activityScore, setActivityScore)}
        </div>
        <div className="flex justify-between items-center">
          <span style={customStyles.text}>
            팀원은 자기가 맡은 업무를 정확히 마쳤습니까?
          </span>
          {renderStars(accuracyScore, setAccuracyScore)}
        </div>
        <div className="flex justify-between items-center">
          <span style={customStyles.text}>
            팀원은 팀원들과 화합이 잘되었습니까?
          </span>
          {renderStars(teamworkScore, setTeamworkScore)}
        </div>
        <div className="flex justify-between items-center">
          <span style={customStyles.text}>팀원의 전체활동을 평가한다면?</span>
          {renderStars(overallScore, setOverallScore)}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button style={customStyles.button} onClick={handleSave}>
          저장
        </button>
        <button style={customStyles.button} onClick={closeModal}>
          닫기
        </button>
      </div>
    </Modal>
  );
};

export default StarRatingModal;
