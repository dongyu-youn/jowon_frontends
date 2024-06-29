import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const SurveyModal = ({ onClose, toggleLike }) => {
  const [responses, setResponses] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "", // 새로 추가된 질문
  });
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  const [response, setResponse] = useState([]);

  const modalRef = useRef(null);

  const handleChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  // Create an array of response objects
  const formattedResponses = questions.map((question, index) => ({
    question: question.id,
    choice: responses[`question${index + 1}`],
    survey: 1, // 설문조사 ID로 교체 필요
  }));

  // 배열에 선택된 값들만 저장
  const selectedChoices = questions.map(
    (question, index) => responses[`question${index + 1}`]
  );

  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  const handleSubmit = async (e, matchingType) => {
    e.preventDefault();
    const formattedResponses = questions.map((question, index) => ({
      question: question.id,
      choice: responses[`question${index + 1}`],
      survey: question.survey, // 설문조사 ID를 각 질문에 포함시켜야 합니다.
    }));

    const selectedChoices = questions.map(
      (question, index) => responses[`question${index + 1}`]
    );

    try {
      for (let response of formattedResponses) {
        await axiosInstance.post(
          "http://127.0.0.1:8000/survey/responses/",
          response
        );
      }
      console.log("Survey responses submitted:", formattedResponses);
      console.log("Selected choices:", selectedChoices);

      // 설문조사가 성공적으로 제출된 후에 toggleLike를 호출합니다.
      toggleLike(e, selectedChoices, matchingType);
      console.log("toggle 함수가 호출되었습니다"); // 로그 추가
      onClose();
    } catch (error) {
      console.error("Error submitting survey responses:", error);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/contests/${id}/survey/`
        );

        // 응답 데이터 확인
        console.log("Response Data:", response.data);

        // response.data가 배열인지 확인하고, 질문들을 합침
        if (response.data && response.data.questions) {
          const allQuestions = response.data.questions;
          setQuestions(allQuestions);
          console.log(allQuestions);

          // 합쳐진 질문들을 출력
          allQuestions.forEach((question, index) => {
            console.log(`Question ${index + 1}: ${question.text}`);
            console.log("Choices:", question.choices);
          });
        } else {
          setQuestions([]); // 데이터가 유효하지 않을 경우 빈 배열로 설정
          console.error("Invalid response data format");
        }

        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/survey/responses/"
        );
        setResponse(response.data[0].choices);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div
        className="bg-white p-10 rounded-lg w-full max-w-4xl max-h-screen overflow-y-scroll"
        ref={modalRef}
      >
        <h2 className="text-3xl font-bold mb-8 text-black">
          인공지능 서비스를 위한 설문조사
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <form>
            <div>
              {questions.map((question, index) => (
                <div className="mb-8" key={index}>
                  <label
                    htmlFor={`question${index + 1}`}
                    className="block mb-2 text-black"
                  >{`질문 ${index + 1}: ${question.text}`}</label>
                  <select
                    id={`question${index + 1}`}
                    name={`question${index + 1}`}
                    className="w-full border rounded p-3 text-black"
                    onChange={handleChange}
                  >
                    <option value="">선택해주세요</option>
                    {question.choices.map((choice, idx) => (
                      <option
                        key={idx}
                        value={choice[0]}
                        className="text-black"
                      >
                        {choice[1]}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="bg-pink-800 text-white px-4 py-2 mr-4 rounded"
                onClick={(e) => handleSubmit(e, "top_two")} // 최강 매칭 타입 설정
              >
                Ace팀
              </button>
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={(e) => handleSubmit(e, "same")} // 균등한 매칭 타입 설정
              >
                Balance팀
              </button>

              <button
                type="button"
                className="bg-yellow-500 text-white px-4 py-2 rounded ml-4"
                onClick={(e) => handleSubmit(e, "random")} // 무작위 매칭 타입 설정
              >
                Random팀
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SurveyModal;
