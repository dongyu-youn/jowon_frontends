import React from "react";
import RankBadge from "./RankBadge";

const ProductCard = ({ imageUrl, title, content, rank }) => {
  return (
    <div
      style={{ width: "460px", height: "460px" }}
      className="relative bg-white rounded-lg shadow-lg overflow-hidden p-12"
    >
      <div className="absolute inset-0 overflow-hidden">
        <RankBadge rank={rank}></RankBadge>
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.8 }} // 이미지 투명도 조절
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h2
          className="text-xl font-bold text-white mb-2"
          style={{ textShadow: "1px 1px 2px black" }}
        >
          {title}
        </h2>
        <p className="text-white" style={{ textShadow: "1px 1px 2px black" }}>
          {content}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
