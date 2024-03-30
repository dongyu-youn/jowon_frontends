import React from "react";
import { Link, useParams } from "react-router-dom";

import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";

import Slider from "react-slick";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import PictureCard from "../components/PictureCard";

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

export default function Today() {
  const customDotStyles = {
    backgroundColor: "black", // 여기에 원하는 색상으로 변경하세요
    width: "10px", // 도트의 너비 조절
    height: "10px", // 도트의 높이 조절
    borderRadius: "50%", // 도트를 원형으로 만듭니다
  };

  const settings = {
    dots: 3,

    infinite: true,
    speed: 500,
    slidesToShow: 3, // 3개씩 보여주도록 설정
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // 왼쪽 화살표를 이모티콘으로 대체
    nextArrow: <NextArrow />,
  };

  const { keyword } = useParams();

  return (
    <div className="bg-white text-black p-12  ">
      <h1 className="font-customFont text-5xl flex justify-center">
        Popular Contest
      </h1>

      <div className="">
        <Slider {...settings} className="p-12 flex items-center">
          <PictureCard></PictureCard>
          <PictureCard></PictureCard>
          <PictureCard></PictureCard>
        </Slider>

        <Link
          to="/pictures"
          className="flex items-center justify-center blinking-text "
        >
          <h1 className="text-3xl mb-2 font-diphylleia ">more</h1>
        </Link>
      </div>
    </div>
  );
}
