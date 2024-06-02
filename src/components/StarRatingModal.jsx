// StarRatingModal.js

import React, { useState } from "react";
import Modal from "react-modal";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

const customStyles = {
  content: {
    width: "500px",
    height: "400px",
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
          ratee: 2,
          score: rating,
        }
      );
      console.log("Rating saved successfully.");
    } catch (error) {
      console.error("Error saving rating:", error);
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="별점 주기"
      isTopMost={true}
    >
      <h2 style={customStyles.text}>별점 주기</h2>
      <div className="flex justify-center p-2">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => setRating(index + 1)}
            color={index < rating ? "#ffc107" : "#e4e5e9"}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
      <div className="flex">
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
