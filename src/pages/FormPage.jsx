import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const departments = [
  { value: 1, label: "Department 1" },
  { value: 2, label: "Department 2" },
  // 다른 학과 추가...
];

const courses = [
  { value: 1, label: "Course 1" },
  { value: 2, label: "Course 2" },
  // 다른 과목 추가...
];

const majorFields = [
  { value: 1, label: "Field 1" },
  { value: 2, label: "Field 2" },
  // 다른 전공 분야 추가...
];

const bootcampExperience = [
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

const certificateScores = [
  { value: 1, label: "Score 1" },
  { value: 2, label: "Score 2" },
  // 다른 점수 추가...
];

const FormPage = () => {
  const [formData, setFormData] = useState({
    grade: "",
    github_commit_count: "",
    baekjoon_score: "",
    programmers_score: "",
    certificate_count: "",
    senior: "",
    depart: "",
    courses_taken: "",
    major_field: "",
    bootcamp_experience: "",
    in_school_award_cnt: "",
    out_school_award_cnt: "",
    coding_test_score: "",
    certificate_score: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userToken = Cookies.get("csrftoken") || "";

      const axiosInstance = axios.create({
        withCredentials: true,
        headers: {
          "X-CSRFToken": userToken,
        },
      });
      // axios를 사용하여 POST 요청 보내기
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/users/score/",
        formData
      );
      console.log("Data sent:", response.data);

      // 성공적으로 데이터를 서버에 전송한 후, 필요한 처리 추가 가능
      alert("데이터가 성공적으로 전송되었습니다.");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("데이터 전송 중 오류가 발생하였습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl mt-36 mb-36">
        <h2 className="text-2xl mb-6 text-center text-gray-700">정보 입력</h2>
        <form onSubmit={handleSubmit}>
          {/* 성과 섹션 */}
          <div className="mb-8 p-4 border border-gray-300 rounded">
            <h3 className="text-xl mb-4 text-gray-700">성실도</h3>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">학점</label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                placeholder="학점을 입력하세요"
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
                onChange={handleChange}
              />
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">깃허브 commit 횟수</label>
              <input
                type="text"
                name="github_commit_count"
                value={formData.github_commit_count}
                placeholder="깃허브 commit 횟수를 입력하세요"
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
                onChange={handleChange}
              />
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">백준 활용도</label>
              <input
                type="text"
                name="baekjoon_score"
                value={formData.baekjoon_score}
                placeholder="백준 제출완료 문제수를 입력하세요"
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
                onChange={handleChange}
              />
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700">프로그래머스 활용도</label>
              <input
                type="text"
                name="programmers_score"
                value={formData.programmers_score}
                placeholder="프로그래머스 제출완료 문제수를 입력하세요"
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
                onChange={handleChange}
              />
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700">자격증 보유 갯수</label>
              <input
                type="text"
                name="certificate_count"
                value={formData.certificate_count}
                placeholder="자격증 보유 갯수를 입력하세요"
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
                onChange={handleChange}
              />
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>
          </div>

          {/* 경험 섹션 */}
          <div className="mb-8 p-4 border border-gray-300 rounded">
            <h3 className="text-xl mb-4 text-gray-700">경험</h3>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700">학년</label>
              <input
                type="text"
                name="senior"
                value={formData.senior}
                placeholder="학년을 입력하세요"
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
                onChange={handleChange}
              />
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">연관학과</label>
              <select
                name="depart"
                value={formData.depart}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
              >
                <option value="">학과를 선택하세요</option>
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">수강과목</label>
              <select
                name="courses_taken"
                value={formData.courses_taken}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
              >
                <option value="">수강과목을 선택하세요</option>
                {courses.map((course) => (
                  <option key={course.value} value={course.value}>
                    {course.label}
                  </option>
                ))}
              </select>
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">전공 분야</label>
              <select
                name="major_field"
                value={formData.major_field}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
              >
                <option value="">전공 분야를 선택하세요</option>
                {majorFields.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">부트캠프 경험여부</label>
              <select
                name="bootcamp_experience"
                value={formData.bootcamp_experience}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
              >
                <option value="">부트캠프 경험여부를 선택하세요</option>
                {bootcampExperience.map((exp) => (
                  <option key={exp.value} value={exp.value}>
                    {exp.label}
                  </option>
                ))}
              </select>
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>
          </div>

          {/* 성과 섹션 */}
          <div className="mb-8 p-4 border border-gray-300 rounded">
            <h3 className="text-xl mb-4 text-gray-700">성과</h3>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">교내 수상횟수</label>
              <input
                type="text"
                name="in_school_award_cnt"
                value={formData.in_school_award_cnt}
                placeholder="교내 수상횟수를 입력하세요"
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
                onChange={handleChange}
              />
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">교외 수상횟수</label>
              <input
                type="text"
                name="out_school_award_cnt"
                value={formData.out_school_award_cnt}
                placeholder="교외 수상횟수를 입력하세요"
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
                onChange={handleChange}
              />
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">코딩 테스트 점수</label>
              <input
                type="text"
                name="coding_test_score"
                value={formData.coding_test_score}
                placeholder="코딩 테스트 점수를 입력하세요"
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
                onChange={handleChange}
              />
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700">자격증 점수</label>
              <select
                name="certificate_score"
                value={formData.certificate_score}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-700 p-2 rounded"
              >
                <option value="">자격증 점수를 선택하세요</option>
                {certificateScores.map((score) => (
                  <option key={score.value} value={score.value}>
                    {score.label}
                  </option>
                ))}
              </select>
              <div className="mr-96 mt-4">
                <label className="text-gray-700 mr-2">첨부자료</label>
                <input
                  type="file"
                  name="departFile"
                  className="text-gray-700 mt-2"
                />
              </div>
            </div>
          </div>

          <button className="bg-black hover:bg-white text-white hover:text-black py-2 px-4 rounded w-full">
            저장
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
