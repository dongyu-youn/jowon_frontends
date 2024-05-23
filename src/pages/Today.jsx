import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import Slider from "react-slick";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import PictureCard from "../components/PictureCard";
import { useQueryClient, useQuery } from "react-query"; // 변경된 부분
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
  const queryClient = useQueryClient(); // 변경된 부분

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

  const customDotStyles = {
    backgroundColor: "black",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  };

  const settings = {
    dots: 3,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
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
          <Slider {...settings} className="p-12 flex items-center">
            {videos.results.map((video) => (
              <PictureCard key={video.id} video={video}></PictureCard>
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
