import React, { useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";
export default function MessageModal({ isOpen, onClose, onSubmit }) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });
  const handleSubmit = async () => {
    try {
      // 메시지를 포함하여 axios로 POST 요청 보내기
      await axiosInstance.post("http://127.0.0.1:8000/notifications/", {
        receiver: 1, // 사용자 ID
        message: message,
        image: null,
        conversation_id: 2, // 새로 생성된 conversation ID 추가v
      });

      // 요청이 성공하면 onSubmit 콜백 함수 호출
      onSubmit();

      // 쿼리 다시 불러오기 등의 작업
    } catch (error) {
      console.error("Error proposing:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">Enter your message</h2>
        <textarea
          className="w-full h-32 border border-gray-300 rounded-lg p-2 mb-4 text-black"
          placeholder="Type your message here..."
          value={message}
          onChange={handleChange}
        ></textarea>
        <button
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
}
