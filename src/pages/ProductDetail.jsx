import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../components/ProductCard";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

const NextArrow = (props) => (
  <div {...props}>
    <IoChevronForwardOutline size={56} className="align-middle" />
  </div>
);

const PrevArrow = (props) => (
  <div {...props}>
    <IoChevronBackOutline size={56} className="align-middle" />
  </div>
);

export default function ProductDetail({ title }) {
  const sliderRef = useRef(null); // 슬라이더 ref 생성

  const handleScroll = (e) => {
    // 마우스 휠 이벤트 핸들러
    if (e.deltaY > 0) {
      sliderRef.current.slickNext(); // 마우스 휠을 아래로 스크롤할 때 다음 슬라이드로 전환
    } else {
      sliderRef.current.slickPrev(); // 마우스 휠을 위로 스크롤할 때 이전 슬라이드로 전환
    }
  };

  // 이미지 배열
  const images = [
    {
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/202401181850138406525.jpg?alt=media&token=4be48c4c-ca09-43d3-ab65-0f2b96b5e74d",
      title: "도배 하자 질의 응답 처리 : 한솔데코 시즌2 AI 경진대회",
      content: "Product Description",
      rank: "1",
    },
    {
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/202309260935017642082.jpg?alt=media&token=639bdce4-9790-44b9-82bc-12057c938b92",
      title: "2023 제2회 국방 AI 경진대회 MAICON",
      content: "Product Description",
      rank: "2",
    },
    {
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/SW%E1%84%8C%E1%85%AE%E1%86%BC%E1%84%89%E1%85%B5%E1%86%B7%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A1%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%83%E1%85%A1%E1%86%AB%20_%20%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A2%E1%86%BC%20%E1%84%92%E1%85%A2%E1%84%8F%E1%85%A5%E1%84%90%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%AC(%E1%84%85%E1%85%A9%E1%84%87%E1%85%A9%E1%86%BA%E1%84%87%E1%85%A2%E1%84%90%E1%85%B3%E1%86%AF)%20_%20%E1%84%8E%E1%85%A1%E1%86%B7%E1%84%80%E1%85%A1%E1%84%90%E1%85%B5%E1%86%B7%20%E1%84%86%E1%85%A9%E1%84%8C%E1%85%B5%E1%86%B8%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A9%20%20.jpeg?alt=media&token=fcbe6a14-3183-43a9-a11c-f5fc560dd201",
      title: "2023 K-EDU 창의력 경진대회",
      content: "Product Description",
      rank: "3",
    },
    {
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/SW%E1%84%8C%E1%85%AE%E1%86%BC%E1%84%89%E1%85%B5%E1%86%B7%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A1%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%83%E1%85%A1%E1%86%AB%20_%20%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A2%E1%86%BC%20%E1%84%92%E1%85%A2%E1%84%8F%E1%85%A5%E1%84%90%E1%85%A9%E1%86%AB%20%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%AC(%E1%84%85%E1%85%A9%E1%84%87%E1%85%A9%E1%86%BA%E1%84%87%E1%85%A2%E1%84%90%E1%85%B3%E1%86%AF)%20_%20%E1%84%8E%E1%85%A1%E1%86%B7%E1%84%80%E1%85%A1%E1%84%90%E1%85%B5%E1%86%B7%20%E1%84%86%E1%85%A9%E1%84%8C%E1%85%B5%E1%86%B8%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A9%20%20.jpeg?alt=media&token=fcbe6a14-3183-43a9-a11c-f5fc560dd201",
      title: "2023 K-EDU 창의력 경진대회",
      content: "Product Description",
      rank: "4",
    },
    // 추가적인 이미지들을 넣어주세요
  ];

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
        {" "}
        {/* 슬라이더 컨테이너의 너비 설정 */}
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
}
