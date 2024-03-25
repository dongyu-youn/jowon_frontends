import React, { useState } from "react";
import { Link } from "react-router-dom";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImage = images[currentIndex];
  const previousImageIndex =
    currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  const nextImageIndex =
    currentIndex === images.length - 1 ? 0 : currentIndex + 1;

  return (
    <div className="relative  flex justify-center items-center ">
      <video
        src="/videos/space.mp4"
        alt="Your Image Description"
        className="w-full h-screen object-cover  "
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dongle&family=Racing+Sans+One&display=swap');

          .custom-font {
            font-family: 'Dongle', 'Racing Sans One', sans-serif;
          }
        `}
      </style>
      <div className="flex flex-col justify-center items-center h-full absolute ">
        <div className="flex justify-center items-center p-4 space-x-6  ">
          <Link to={`/detail/1`} className="w-1/4 cursor-pointer">
            <img
              src={images[previousImageIndex].url}
              alt={images[previousImageIndex].title}
              title={currentImage} // 페이지 이름을 props로 전달
              className="w-full object-cover object-center p-4 rounded-lg shadow-md overflow-hidden border border-white hover:scale-105"
            />
          </Link>
          <Link to={`/detail/1`} className="w-1/2 cursor-pointer">
            <img
              src={currentImage.url}
              alt={currentImage.title}
              title={currentImage} // 페이지 이름을 props로 전달
              className="w-full object-cover object-center p-4 rounded-lg shadow-md overflow-hidden border border-white hover:scale-105"
            />
          </Link>
          <Link
            to={`/detail/${images[nextImageIndex].id}`}
            className="w-1/4 cursor-pointer"
          >
            <img
              src={images[nextImageIndex].url}
              alt={images[nextImageIndex].title}
              title={currentImage} // 페이지 이름을 props로 전달
              className="w-full object-cover object-center p-4 rounded-lg shadow-md overflow-hidden border border-white hover:scale-105"
            />
          </Link>
        </div>
      </div>
      <div className="absolute top-0 left-4 right-0 py-2">
        <p className="text-white bg-opacity-50 p-12 text-8xl custom-font">
          {currentImage.title}
        </p>
      </div>
      {/* Prev and Next Buttons */}
      <div className="absolute bottom-12 left-10% right-8 flex justify-center">
        <button
          onClick={goToPrevious}
          className="bg-gray-900 bg-opacity-50 text-white px-4 py-2 rounded-l border border-white hover:bg-white hover:text-black"
        >
          Previous
        </button>
        <button
          onClick={goToNext}
          className="bg-gray-900 bg-opacity-50 text-white px-4 py-2 rounded-r border border-white hover:bg-white hover:text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Slider;
