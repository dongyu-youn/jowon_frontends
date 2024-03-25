import React from "react";
import Slider from "./Slider";
import Button from "../components/Button";

const images = [
  {
    url: "/imgs/money.jpg",
    title: "추천 장학금",

    // Add other properties like URL if needed
  },
  {
    url: "/imgs/wpoint.jpg",
    title: "추천 w-point",
    // Add other properties like URL if needed
  },
  {
    url: "/imgs/competition.jpg",
    title: "추천대회",
    // Add other properties like URL if needed
  },
  // Add more images as needed
];

export default function Home() {
  return (
    <section className="relative">
      <div className="">
        <Slider images={images}></Slider>
        <Button></Button>
      </div>
    </section>
  );
}
