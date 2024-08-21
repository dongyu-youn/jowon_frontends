import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="relative w-40 h-24 mr-8 bg-gray-500 font-diphylleia font-bold text-2xl text-white py-2 px-4 rounded-sm hover:brightness-110 mt-12 hover:bg-black"
      onClick={onClick}
    >
      <div>
        {text === "신청자조회" && (
          <span className="absolute top-0 right-0 bg-pink-800 text-white rounded-full w-8 h-8 flex items-center justify-center">
            6
          </span>
        )}
      </div>
      {text}
    </button>
  );
}
