import React from "react";

export default function Button({ onClick, children }) {
  return (
    <button className="absolute top-60% left-1/2 transform -translate-x-1/2 bottom-8 text-white text-6xl rounded-full hover:bg-white hover:text-gray-900 hover:scale-110 hover:shadow-lg w-60 h-30 duration-500 animate-bubble custom-font ">
      [분석하기]
      <div className="absolute w-full h-full bg-white text-black top-0 left-0 rounded-full transform scale-0 origin-top-left group-hover:scale-150 opacity-0 group-hover:opacity-100 duration-500"></div>
    </button>
  );
}
