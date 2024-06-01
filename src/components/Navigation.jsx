import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5"; // 아이콘 추가

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
import LoginModal from "./LoginModal";
import Profile from "../pages/Profile";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();

  // 현재 페이지의 URL을 가져오는 함수
  const getCurrentPath = () => {
    return location.pathname;
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로컬 스토리지에서 초기값을 가져옴
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return null;
    }
  });

  // user 상태가 변경될 때마다 로컬 스토리지에 저장
  // user 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User state saved to localStorage:", user);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }

    // user 상태가 업데이트될 때 isLoggedIn 상태도 업데이트
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => setSearchOpen((prev) => !prev);

  // 로그인 성공 시 호출될 콜백 함수
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  // 로그인 상태에 따라 로그인/로그아웃 버튼 텍스트 결정
  const loginButtonText = isLoggedIn ? "Logout" : "Login";

  const navigate = useNavigate();

  const handleProfileLinkClick = () => {
    // 이 부분에서 user 상태를 업데이트하여 원하는 정보를 전달할 수 있습니다.
    console.log(user);
    navigate("/pictures", { state: { test: user } });
  };

  // 로그인 상태에 따라 프로필 링크 표시 여부 결정
  const profileLink = isLoggedIn ? (
    <li className="p-4 hover:bg-gray-100 ">
      <Link
        to={{ pathname: "pictures/profile", state: { user: user } }}
        className="header__menu__item hover:text-pink-800 font-customFont"
        style={{ color: "black" }} // 여기에 color 속성 추가
      >
        Profile
      </Link>
    </li>
  ) : null;

  // 로그인 버튼 클릭 시 로그인 모달 열기 또는 로그아웃 처리
  const handleLoginButtonClick = () => {
    if (isLoggedIn) {
      // 로그아웃 처리
      setIsLoggedIn(false);
    } else {
      // 로그인 모달 열기
      onLoginOpen();
    }
  };

  // 로그인 모달 닫힐 때 입력된 데이터 초기화
  const handleLoginClose = () => {
    onLoginClose();
    // 입력된 데이터 초기화 코드 추가
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <ul className="flex items-center mr-8">
        <li
          className={`inline-block align-top relative p-4 font-customFont ${
            getCurrentPath() === "/pictures" ? "text-pink-800" : ""
          }`}
        >
          <Link
            to="/pictures"
            className="header__menu__item hover:text-pink-800 pr-8"
          >
            Contests
          </Link>
        </li>
        <li
          className={`inline-block align-top relative p-4 font-customFont ${
            getCurrentPath() === "/pictures/favs" ? "text-pink-800" : ""
          }`}
        >
          <Link
            to="/pictures/favs"
            className="inline-block align-top relative p-4 font-customFont hover:underline"
          >
            <a className="header__menu__item hover:text-pink-800 pr-8">Likes</a>
          </Link>
        </li>

        <li
          className={`inline-block align-top relative p-4 font-customFont ${
            getCurrentPath() === "/pictures/messages" ? "text-pink-800" : ""
          }`}
        >
          <Link
            to="/pictures/messages"
            className="inline-block align-top relative p-4 font-customFont hover:underline hover:text-pink-800"
          >
            Team Matching
          </Link>
        </li>

        <div className="relative inline-block">
          <button
            className="font-customFont inline-flex items-center justify-between p-4 font-customFont bg-black text-white hover:bg-white hover:text-black focus:outline-none"
            onClick={toggleDropdown}
          >
            My Page
            {isOpen ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
          </button>
          {isOpen && (
            <ul className="absolute left-0 mt-2 w-36 bg-white shadow-md z-10 flex flex-col">
              {profileLink}
              <li className="relative">
                <Link
                  to="/notifications"
                  className="p-4 hover:bg-gray-100 hover:text-pink-800 flex items-center relative justify-center"
                  style={{ color: "black" }} // 글씨색 검정으로 설정
                >
                  <span className="mr-2 font-customFont">Notification</span>
                  <span className="absolute top-0 right-0 bg-pink-800 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    3 {/* 알림 숫자 */}
                  </span>
                </Link>
              </li>
              <li className="p-4 hover:bg-gray-100 hover:text-pink-800 hover:cursor:pointer">
                {/* 로그인/로그아웃 버튼 */}
                <p
                  className="inline-block align-top relative p-4 font-customFont  pr-8 hover:cursor-pointer"
                  style={{ color: "black" }} // 글씨색 검정으로 설정
                  onClick={handleLoginButtonClick}
                >
                  {loginButtonText}
                </p>
              </li>
            </ul>
          )}
        </div>
      </ul>

      {/* 로그인 모달 */}
      <LoginModal
        onLoginSuccess={handleLoginSuccess}
        isOpen={isLoginOpen}
        onClose={handleLoginClose}
        setUser={setUser}
      />
    </div>
  );
}
