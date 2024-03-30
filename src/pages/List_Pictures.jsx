import React from "react";
import { useParams } from "react-router-dom";

import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";

import Slider from "react-slick";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import PictureCard from "../components/PictureCard";
import SelectBox from "../components/SelectBox";

export default function List_Pictures() {
  const { keyword } = useParams();

  return (
    <div className="bg-white text-black p-12">
      <div className="flex justify-end">
        <SelectBox text="전국"></SelectBox>
        <SelectBox text="전북"></SelectBox>
        <SelectBox text="원대"></SelectBox>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4 ">
          <PictureCard></PictureCard>
          <PictureCard></PictureCard>
          <PictureCard></PictureCard>
          <PictureCard></PictureCard>
          <PictureCard></PictureCard>

          <PictureCard></PictureCard>
          <PictureCard></PictureCard>
          <PictureCard></PictureCard>
          <PictureCard></PictureCard>

          <div className="flex items-center justify-center blinking-text ">
            <h1 className="text-3xl mb-2 font-diphylleia ">more</h1>
            <IoIosArrowRoundBack className="text-3xl ml-1 font-diphylleia " />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
