import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../components/ProductCard";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

// NextArrow 컴포넌트
const NextArrow = (props) => (
  <div {...props}>
    <IoChevronForwardOutline size={56} className="align-middle" />
  </div>
);

// PrevArrow 컴포넌트
const PrevArrow = (props) => (
  <div {...props}>
    <IoChevronBackOutline size={56} className="align-middle" />
  </div>
);

// 슬라이더 컴포넌트
const ImageSlider = ({ images }) => {
  const sliderRef = useRef(null); // 슬라이더 ref 생성

  const handleScroll = (e) => {
    // 마우스 휠 이벤트 핸들러
    if (e.deltaY > 0) {
      sliderRef.current.slickNext(); // 마우스 휠을 아래로 스크롤할 때 다음 슬라이드로 전환
    } else {
      sliderRef.current.slickPrev(); // 마우스 휠을 위로 스크롤할 때 이전 슬라이드로 전환
    }
  };

  // 슬라이더 설정
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 3개씩 보여주도록 설정
    slidesToScroll: 1, // 한 번에 한 개의 슬라이드만 넘어가도록 설정
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div
      className="h-screen bg-black flex flex-col justify-between py-16"
      onWheel={handleScroll} // 마우스 휠 이벤트 핸들러 추가
      style={{ overflowX: "hidden" }} // 가로 스크롤을 숨김
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dongle&family=Racing+Sans+One&display=swap');
          .custom-font {
            font-family: 'Dongle', 'Racing Sans One', sans-serif;
          }
          .slick-slide {
            outline: none; // 슬라이드 클릭 시 파란 테두리 제거
          }
        `}
      </style>
      <div
        className="h-screen border-t border-b border-white relative"
        style={{ width: "100vw" }}
      >
        {/* 제목 */}
        <p className="text-white bg-opacity-50 text-8xl custom-font top-4 left-8 p-4 ml-4 ">
          대 회 추 천
        </p>
        {/* 내용 */}
        <div className="">
          <Slider ref={sliderRef} {...settings}>
            {/* 이미지를 슬라이드로 매핑 */}
            {images.map((image, index) => (
              <div key={index}>
                <ProductCard
                  imageUrl={image.imageUrl}
                  title={image.title}
                  content={image.content}
                  rank={image.rank}
                  className="mr-4"
                  style={{ objectFit: "cover" }} // 이미지에 object-fit 속성 추가
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
