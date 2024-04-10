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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolling(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 페이지 경로를 확인하여 해당 페이지인지 여부를 결정하는 변수들을 업데이트합니다.
  const isPictureDetailPage = location.pathname.includes("pictures/");
  const isMessagePage = location.pathname.includes("pictures/messages");

  let headerClass = `z-50 w-full flex p-4 text-2xl mb-4 justify-between items-center group hover:border-b hover:border-zinc-600 transition-colors duration-300 ease-in-out hover:bg-white hover:text-black`;

  // isPictureDetailPage가 거짓이거나 isMessagePage가 거짓인 경우에만 fixed 스타일을 적용합니다.
  if (!isPictureDetailPage && !isMessagePage) {
    headerClass += " fixed";
  }

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
