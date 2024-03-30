import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PictureCard from "../components/PictureCard";
import Home from "./Home";
import About from "./About";

import Slider from "react-slick";
import Today from "./Today";
import Footer from "../components/Footer";
import { Link, Element, scroller } from "react-scroll";

const Pictures = () => {
  const scrollToSection = (sectionId) => {
    // 부드러운 스크롤을 위해 react-scroll 라이브러리 사용
    console.log("hello");
    scroller.scrollTo(sectionId, {
      duration: 800,
      smooth: "easeInOutQuart",
    });
  };

  // const [position, setPosition] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     setPosition({ x: e.clientX, y: e.clientY });
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  return (
    <>
      <Home scrollToSection={scrollToSection}></Home>
      <About scrollToSection={scrollToSection}></About>
      <Element name="today" className="section">
        <Today></Today>
      </Element>
      <Footer></Footer>
    </>
  );
};

export default Pictures;
