import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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

  const [response, setResponse] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    // 먼저 toggleLike 함수 호출
    toggleLike(e, selectedChoices);
    try {
      for (let response of formattedResponses) {
        await axiosInstance.post(
          "http://127.0.0.1:8000/survey/responses/",
          response
        );
      }
      console.log("Survey responses submitted:", formattedResponses);
      // 설문조사가 성공적으로 제출된 후에 toggleLike를 호출합니다.

      console.log("Selected choices:", selectedChoices);
      // 설문조사가 성공적으로 제출된 후에 toggleLike를 호출합니다.

      console.log("toggle 함수가 호출되었습니다"); // 로그 추가
      onClose();
    } catch (error) {
      console.error("Error submitting survey responses:", error);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/survey/");

        // 응답 데이터 확인
        console.log("Response Data:", response.data);

        // response.data가 배열인지 확인하고, 질문들을 합침
        if (Array.isArray(response.data)) {
          const allQuestions = response.data.reduce((acc, survey) => {
            return acc.concat(survey.questions);
          }, []);

          setQuestions(allQuestions);
          console.log(allQuestions);
          // 합쳐진 질문들을 출력
          allQuestions.forEach((question, index) => {
            console.log(`Question ${index + 1}: ${question.title}`);
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
  }, []);

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

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50  ">
      <div className="bg-white p-10 rounded-lg w-full max-w-4xl max-h-screen overflow-y-scroll">
        <h2 className="text-3xl font-bold mb-8 text-black">
          인공지능 서비스를 위한 설문조사
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
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

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 text-black px-4 py-2 mr-4 rounded"
                onClick={onClose}
              >
                취소
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                제출
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SurveyModal;
