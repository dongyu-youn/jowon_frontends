import { useState } from "react";
import {
  FaUserNinja,
  FaLock,
  FaEnvelope,
  FaUserSecret,
  FaVoicemail,
} from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { FaSchool } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

export default function SignUpModal({ isOpen, onClose, handleSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState("");
  const [error, setError] = useState(""); // 오류 메시지 상태 추가

  const schools = ["원광대학교", "군산대학교", "한밭대학교"]; // 드롭다운 옵션

  const handleSignUp = async () => {
    // 이메일 유효성 검사
    if (!email.endsWith("wku.ac.kr")) {
      setError("이메일 주소는 wku.ac.kr로 끝나야 합니다.");
      return;
    }
    setError(""); // 오류 메시지 초기화

    const userToken = Cookies.get("csrftoken") || "";

    const axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "X-CSRFToken": userToken,
      },
    });
    try {
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/users/signup/",
        {
          username: username,
          password: password,
          email: email,
          학교: school, // 학교 정보 추가
        }
      );
      console.log(response.data);
      handleSubmit(username, password);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${isOpen ? "fixed inset-0 z-50 overflow-y-auto" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={`fixed inset-0 transition-opacity ${
            isOpen
              ? "ease-out duration-300 opacity-100"
              : "ease-in duration-200 opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={`${
            isOpen
              ? "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              : "hidden"
          }`}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900 mb-2"
                  id="modal-title"
                >
                  Sign up
                </h3>
                <div className="mt-2">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserNinja className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="아이디"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="focus:ring-indigo-500 h-12 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="비밀번호"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaVoicemail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="이메일"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSchool className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 pl-10 sm:text-sm border-gray-300 rounded-md"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                    >
                      <option value="">학교 선택</option>
                      {schools.map((schoolOption) => (
                        <option key={schoolOption} value={schoolOption}>
                          {schoolOption}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSignUp}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-800 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
