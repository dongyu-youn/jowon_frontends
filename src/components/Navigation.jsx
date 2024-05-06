import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
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
  const location = useLocation();

  // 현재 페이지의 URL을 가져오는 함수
  const getCurrentPath = () => {
    return location.pathname;
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
    <li className="inline-block align-top relative p-4 font-customFont hover:underline">
      <Link
        to={{ pathname: "pictures/profile", state: { user: user } }}
        className="header__menu__item hover:text-pink-800 pr-8"
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

  return (
    <div className="">
      <ul className="flex items-center">
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
        <Link
          to="/pictures/favs"
          className="inline-block align-top relative p-4 font-customFont hover:underline"
        >
          <a className="header__menu__item hover:text-pink-800 pr-8">Favs</a>
        </Link>
        <li className="inline-block align-top relative p-4 font-customFont hover:underline">
          {/* 로그인/로그아웃 버튼 */}
          <p
            className="inline-block align-top relative p-4 font-customFont hover:underline pr-8"
            onClick={handleLoginButtonClick}
          >
            {loginButtonText}
          </p>
        </li>
        {profileLink}
        <li className="inline-block align-top relative p-4 font-customFont hover:underline">
          <Link
            to="/pictures/messages"
            className="flex align-top relative p-4 font-customFont hover:underline bg-black text-white items-center hover:bg-white hover:text-black"
          >
            Team Matching <IoChevronForwardOutline />
          </Link>
        </li>
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
