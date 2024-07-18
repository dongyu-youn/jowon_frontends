import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import Slider from "react-slick";
import PictureCard from "../components/PictureCard";
import { useQuery } from "react-query";
import axios from "axios";

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
  const { keyword } = useParams();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos"], async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/contests/");
      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768, // 작은 화면에서는 하나씩 보여주기
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white text-black p-12">
      <h1 className="font-customFont text-5xl flex justify-center">
        Popular Contest
      </h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong...</p>}
      {videos && (
        <div>
          <Slider {...settings} className="p-12">
            {videos.results.map((video) => (
              <div key={video.id} className="px-2">
                <PictureCard video={video}></PictureCard>
              </div>
            ))}
          </Slider>

          <Link
            to="/pictures"
            className="flex items-center justify-center blinking-text"
          >
            <h1 className="text-3xl mb-2 font-diphylleia">more</h1>
          </Link>
        </div>
      )}
    </div>
  );
}
