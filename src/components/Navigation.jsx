import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  IoChevronUpOutline,
  IoChevronDownOutline,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { useDisclosure } from "@chakra-ui/react";
import LoginModal from "./LoginModal";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User state saved to localStorage:", user);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }

    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const location = useLocation();
  const getCurrentPath = () => location.pathname;

  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  const loginButtonText = isLoggedIn ? "Logout" : "Login";
  const navigate = useNavigate();

  const handleProfileLinkClick = () => {
    console.log(user);
    navigate("/pictures", { state: { test: user } });
  };

  const profileLink = isLoggedIn ? (
    <li className="p-4 hover:bg-gray-100">
      <Link
        to={{ pathname: "pictures/profile", state: { user: user } }}
        className="header__menu__item hover:text-pink-800 font-customFont"
        style={{ color: "black" }}
      >
        Profile
      </Link>
    </li>
  ) : null;

  const handleLoginButtonClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      onLoginOpen();
    }
  };

  const handleLoginClose = () => {
    onLoginClose();
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex justify-between items-center p-4 ${
        isScrolled ? "white-bg" : "transparent-bg"
      } transition-bg`}
    >
      <div className="text-2xl font-bold">
        <Link to="/"></Link>
      </div>
      <div className="hidden md:flex items-center mr-8">
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
          <li
            className={`inline-block align-top relative p-4 font-customFont ${
              getCurrentPath() === "/pictures/favs" ? "text-pink-800" : ""
            }`}
          >
            <Link
              to="/pictures/favs"
              className="inline-block align-top relative p-4 font-customFont hover:underline"
            >
              Likes
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
              className="font-customFont inline-flex items-center justify-between p-4 bg-black text-white hover:bg-white hover:text-black focus:outline-none"
              onClick={toggleDropdown}
            >
              My Page
              {isOpen ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
            </button>
            {isOpen && (
              <ul className="absolute left-0 mt-2 w-36 bg-white shadow-md z-10 flex flex-col">
                {profileLink}
                <Link to="/pointshop">
                  <li className="p-4 pr-4 hover:bg-gray-100 hover:text-pink-800 hover:cursor:pointer">
                    <p
                      className="inline-block align-top relative p-4 font-customFont hover:cursor-pointer"
                      style={{ color: "black" }}
                    >
                      PointShop
                    </p>
                  </li>
                </Link>
                <Link to="/ranking">
                  <li className="p-4 pr-4 hover:bg-gray-100 hover:text-pink-800 hover:cursor:pointer">
                    <p
                      className="inline-block align-top relative p-4 font-customFont hover:cursor-pointer"
                      style={{ color: "black" }}
                    >
                      Ranking
                    </p>
                  </li>
                </Link>
                <li className="relative">
                  <Link
                    to="/notifications"
                    className="p-4 hover:bg-gray-100 hover:text-pink-800 flex items-center relative justify-center"
                    style={{ color: "black" }}
                  >
                    <span className="mr-2 font-customFont">Notification</span>
                    <span className="absolute top-0 right-0 bg-pink-800 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      3
                    </span>
                  </Link>
                </li>
                <li className="p-4 hover:bg-gray-100 hover:text-pink-800 hover:cursor:pointer">
                  <p
                    className="inline-block align-top relative p-4 font-customFont pr-8 hover:cursor-pointer"
                    style={{ color: "black" }}
                    onClick={handleLoginButtonClick}
                  >
                    {loginButtonText}
                  </p>
                </li>
              </ul>
            )}
          </div>
        </ul>
      </div>
      <div className="md:hidden flex items-center">
        <div className="md:hidden flex items-center relative z-20">
          <div onClick={toggleDropdown}>
            {isOpen ? <IoClose /> : <IoMenu />}
          </div>
        </div>
        {isOpen && (
          <div className="absolute top-0 left-0 w-full bg-white shadow-md z-10">
            <ul className="flex flex-col items-start p-4">
              <li
                className={`inline-block align-top relative p-4 font-customFont ${
                  getCurrentPath() === "/pictures" ? "text-pink-800" : ""
                }`}
              >
                <Link
                  to="/pictures"
                  className="header__menu__item hover:text-pink-800 pr-8"
                  onClick={toggleDropdown}
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
                  onClick={toggleDropdown}
                >
                  Likes
                </Link>
              </li>
              <li
                className={`inline-block align-top relative p-4 font-customFont ${
                  getCurrentPath() === "/pictures/messages"
                    ? "text-pink-800"
                    : ""
                }`}
              >
                <Link
                  to="/pictures/messages"
                  className="inline-block align-top relative p-4 font-customFont hover:underline hover:text-pink-800"
                  onClick={toggleDropdown}
                >
                  Team Matching
                </Link>
              </li>
              {profileLink}
              <Link to="/pointshop" onClick={toggleDropdown}>
                <li className="p-4 pr-4 hover:bg-gray-100 hover:text-pink-800 hover:cursor:pointer">
                  <p
                    className="inline-block align-top relative p-4 font-customFont hover:cursor-pointer"
                    style={{ color: "black" }}
                  >
                    PointShop
                  </p>
                </li>
              </Link>
              <Link to="/ranking" onClick={toggleDropdown}>
                <li className="p-4 pr-4 hover:bg-gray-100 hover:text-pink-800 hover:cursor:pointer">
                  <p
                    className="inline-block align-top relative p-4 font-customFont hover:cursor-pointer"
                    style={{ color: "black" }}
                  >
                    Ranking
                  </p>
                </li>
              </Link>
              <li className="relative">
                <Link
                  to="/notifications"
                  className="p-4 hover:bg-gray-100 hover:text-pink-800 flex items-center relative justify-center"
                  style={{ color: "black" }}
                  onClick={toggleDropdown}
                >
                  <span className="mr-2 font-customFont">Notification</span>
                  <span className="absolute top-0 right-0 bg-pink-800 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    3
                  </span>
                </Link>
              </li>
              <li className="p-4 hover:bg-gray-100 hover:text-pink-800 hover:cursor:pointer">
                <p
                  className="inline-block align-top relative p-4 font-customFont pr-8 hover:cursor-pointer"
                  style={{ color: "black" }}
                  onClick={handleLoginButtonClick}
                >
                  {loginButtonText}
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={handleLoginClose}
        setUser={setUser}
      />
    </div>
  );
}
