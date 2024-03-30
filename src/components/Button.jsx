import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-gray-500 font-diphylleia text-white py-2 px-4 rounded-sm hover:brightness-110 mt-16"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
