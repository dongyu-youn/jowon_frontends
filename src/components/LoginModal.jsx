import { useEffect, useState } from "react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import SignUpModal from "./SignUpModal";

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  setUser,
}) {
  const [isSignUpIn, setIsSignUpIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUpClick = () => {
    setIsSignUpIn(true);
  };

  const handleSignUpModalClose = () => {
    setIsSignUpIn(false);
  };

  const saveUserInfoToLocalStorage = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 추가된 부분
    const userToken = Cookies.get("csrftoken") || "";

    const axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "X-CSRFToken": userToken,
      },
    });

    try {
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/users/log-in",
        {
          username,
          password,
        }
      );
      // 로그인 성공 처리
      console.log("로그인 성공:", response.data);
      onClose();
      onLoginSuccess();

      // 사용자 정보를 로컬 스토리지에 저장
      saveUserInfoToLocalStorage(response.data);

      setUser(response.data); // 로그인 성공 시 사용자 정보 설정
    } catch (error) {
      console.error("로그인 요청 중 에러:", error);
      setError("An error occurred while logging in");
    }
  };

  // 애플리케이션 초기화 시에 로컬 스토리지에서 사용자 정보 가져오기
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, [setUser]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">
          {isSignUpIn ? "Sign up" : "Log in"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaUserNinja className="mr-2 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full outline-none focus:ring focus:ring-red-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className="mr-2 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full outline-none focus:ring focus:ring-red-500"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-pink-800 text-white py-2 px-4 rounded-lg w-full"
          >
            Log in
          </button>
        </form>
        <button
          onClick={handleSignUpClick}
          className="bg-pink-800 text-white py-2 px-4 rounded-lg w-full mt-4"
        >
          Sign Up
        </button>
        <button
          onClick={onClose}
          className="text-gray-500 text-sm mt-4 block w-full text-center"
        >
          Close
        </button>
        <SignUpModal
          handleSubmit={handleSubmit}
          isOpen={isSignUpIn}
          onClose={handleSignUpModalClose}
        />
      </div>
    </div>
  );
}
