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
  const [isTeam, setIsTeam] = useState(false); // 개인/팀 선택 상태 관리
  const [teamMembers, setTeamMembers] = useState([]); // 초기 팀원 ID 배열 설정

  const handleIndividualClick = () => {
    setIsTeam(false);
  };

  const handleTeamClick = () => {
    setIsTeam(true);
  };

  const modalRef = useRef(null);

  const handleChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  // 팀원 추가 함수
  const addTeamMember = () => {
    setTeamMembers([...teamMembers, ""]); // 빈 문자열을 추가해 새로운 팀원 자리 마련
  };

  // 팀원 정보 변경 함수
  const handleTeamMemberChange = (index, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = value; // 팀원 ID를 업데이트
    setTeamMembers(updatedMembers);
  };

  // 팀원 삭제 함수
  const removeTeamMember = (index) => {
    const updatedMembers = teamMembers.filter((_, idx) => idx !== index);
    setTeamMembers(updatedMembers);
  };

  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  const handleSubmit = async (e, matchingType) => {
    e.preventDefault();
    const selectedChoices = questions.map(
      (question, index) => responses[`question${index + 1}`]
    );

    // 개인 모드인지 팀 모드인지에 따라 matchingType 설정
    const currentMatchingType = isTeam ? "same" : "random";

    if (isTeam) {
      // 팀 모드의 제출 처리
      const teamResponses = teamMembers.map((memberId, memberIndex) => {
        return questions.map((question, questionIndex) => ({
          question: question.id,
          choice: responses[`question${questionIndex + 1}`],
          survey: question.survey,
          userId: memberId, // 각 팀원의 ID 추가
        }));
      });

      // 모든 팀원의 응답을 서버에 제출
      for (let memberResponses of teamResponses) {
        for (let response of memberResponses) {
          await axiosInstance.post(
            "http://127.0.0.1:8000/survey/responses/",
            response
          );
        }
      }
      console.log("Team survey responses submitted:", teamResponses);

      // 팀 모드일 때는 팀원의 정보를 포함한 배열로 전달
      console.log(teamMembers);
      toggleLike(e, selectedChoices, currentMatchingType, teamMembers, isTeam);
    } else {
      // 개인 모드의 제출 처리
      const formattedResponses = questions.map((question, index) => ({
        question: question.id,
        choice: responses[`question${index + 1}`],
        survey: question.survey,
      }));

      try {
        for (let response of formattedResponses) {
          await axiosInstance.post(
            "http://127.0.0.1:8000/survey/responses/",
            response
          );
        }
        console.log("Survey responses submitted:", formattedResponses);

        // 개인 모드일 때는 빈 배열로 전달
        toggleLike(e, selectedChoices, currentMatchingType, []);

        console.log("toggle 함수가 호출되었습니다");
        onClose();
      } catch (error) {
        console.error("Error submitting survey responses:", error);
      }
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/contests/${id}/survey/`
        );

        if (response.data && response.data.questions) {
          setQuestions(response.data.questions);
        } else {
          setQuestions([]);
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
        <div className="flex justify-center mb-8">
          <button
            className={`flex-1 py-2 rounded-l-lg ${
              !isTeam ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
            }`}
            onClick={handleIndividualClick}
          >
            개인
          </button>
          <button
            className={`flex-1 py-2 rounded-r-lg ${
              isTeam ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
            }`}
            onClick={handleTeamClick}
          >
            팀
          </button>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <form>
            {!isTeam && (
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
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    type="button"
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={(e) => handleSubmit(e, "random")} // 여기에 "random"을 전달
                  >
                    팀생성
                  </button>

                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={onClose}
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}

            {isTeam && (
              <div>
                {teamMembers.map((memberId, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-xl mb-2">팀원 {index + 1}</h4>
                    <input
                      type="text"
                      placeholder="팀원 ID"
                      value={memberId} // 각 팀원의 ID
                      onChange={(e) =>
                        handleTeamMemberChange(index, e.target.value)
                      }
                      className="w-full border rounded p-3 mb-2 text-black"
                    />
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
                    {/* 다른 기술 입력 폼도 추가 가능 */}
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      팀원 삭제
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  팀원 추가
                </button>
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    type="button"
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={(e) => handleSubmit(e, "random")}
                  >
                    팀생성
                  </button>

                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={onClose}
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default SurveyModal;
