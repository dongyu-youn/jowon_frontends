import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Navigation from "./Navigation";

export default function SearchHeader() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };

  useEffect(() => setText(keyword || ""), [keyword]);

  const [scrolling, setScrolling] = useState(false);
  const location = useLocation(); // 현재 페이지의 경로를 가져옵니다.
  console.log(location);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolling(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isPictureDetailPage = window.location.pathname.includes("pictures/");
  const headerClass = `z-10 w-full flex p-4 text-2xl mb-4 justify-between items-center group hover:border-b hover:border-zinc-600 transition-colors duration-300 ease-in-out hover:bg-white hover:text-black ${
    scrolling ? "bg-white text-black" : ""
  } ${isPictureDetailPage ? "" : "fixed"}  `;

  return (
    <>
      <header className={headerClass}>
        <Link to="/" className="flex items-center justify-start">
          <h1 className="text-2xl font-bold inline-block relative w-64 font-customFont hover:text-pink-800">
            1jowon
          </h1>
        </Link>
        <Navigation className="text-center relative justify-center" />
      </header>
    </>
  );
}
