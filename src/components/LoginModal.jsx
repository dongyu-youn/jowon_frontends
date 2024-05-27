import { useEffect, useState } from "react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import SignUpModal from "./SignUpModal";

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  setUser,
}) {
  const [isSignUpIn, setIsSignUpIn] = useState(false);

  // 회원가입 버튼 클릭 시
  const handleSignUpClick = () => {
    setIsSignUpIn(true); // 회원가입 모달을 열기 위해 isSignUpIn을 true로 설정
  };

  // 회원가입 모달에서 닫기 버튼 클릭 시
  const handleSignUpModalClose = () => {
    setIsSignUpIn(false); // 회원가입 모달 닫기
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  // 로그인 성공 후 사용자 정보를 저장하는 함수
  const saveUserInfoToLocalStorage = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      setShowModal(false); // 모달 닫기
      setIsLoggedIn(true); // 로그인 상태 변경
      setUser(response.data); // 로그인 성공 시 사용자 정보 설정
    } catch (error) {
      console.error("로그인 요청 중 에러:", error);
      setError("An error occurred while logging in");
    }
  };
  // 애플리케이션 초기화 시에 로컬 스토리지에서 사용자 정보 가져오기
  const getUserInfoFromLocalStorage = () => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(setUser));
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
          Sing Up
        </button>
        <button
          onClick={onClose}
          className="text-gray-500 text-sm mt-4 block w-full text-center"
        >
          Close
        </button>
        {/* SignUpModal */}
        <SignUpModal
          handleSubmit={handleSubmit}
          isOpen={isSignUpIn}
          onClose={handleSignUpModalClose}
        />
      </div>
    </div>
  );
}
