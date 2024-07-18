import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Navigation from "./Navigation";

export default function SearchHeader() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

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
  const isMessagePage = location.pathname.includes("pictures/messages/");
  const isConversation = location.pathname.includes("pictures/conversations/");

  let headerClass = `z-50 w-full flex p-4 text-2xl mb-4 justify-between items-center group hover:border-b hover:border-zinc-600 transition-colors duration-300 ease-in-out hover:bg-white hover:text-black`;

  // isPictureDetailPage가 거짓이거나 isMessagePage가 거짓인 경우에만 fixed 스타일을 적용합니다.
  if (!isPictureDetailPage && !isMessagePage && !isConversation) {
    headerClass += " fixed";
  }

  const [user, setUser] = useState(null);

  const { id } = useParams(); // URL에서 id 파라미터 추출

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
    <>
      <header
        className={`${headerClass} ${
          isScrolled ? "bg-white shadow-md text-black" : ""
        }`}
        style={{
          // 제목의 기본 스타일
          ...(window.location.pathname === "/pictures/messages"
            ? {
                // 특정 경로로 이동할 때 추가될 스타일
                position: "fixed",
              }
            : {}),
          ...(window.location.pathname === "/pictures/conversations"
            ? {
                position: "fixed",
              }
            : {}),
          ...(window.location.pathname === `/pictures/conversations/${id}`
            ? {
                position: "fixed",
              }
            : {}),
        }}
      >
        <Link to="/" className="flex items-center justify-start w-0 md:w-0">
          <h1 className="text-2xl font-bold inline-block relative w-64 font-customFont hover:text-pink-800">
            1jowon
          </h1>
        </Link>
        <Navigation
          user={user}
          className="text-center relative justify-center"
        />
      </header>
    </>
  );
}
