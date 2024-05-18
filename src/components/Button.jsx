import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-gray-500 font-diphylleia font-bold text-2xl text-white py-2 px-4 rounded-sm hover:brightness-110 mt-4 hover:bg-black"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
