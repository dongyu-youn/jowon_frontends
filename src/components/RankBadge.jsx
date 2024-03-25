import React from "react";

const RankBadge = ({ rank }) => {
  let badgeColor = "";
  let textColor = "";

  // 순위에 따라 배경색과 글자색 결정
  switch (rank) {
    case "1":
      badgeColor = "#FFD700"; // 금색
      textColor = "#000000"; // 검정색
      break;
    case "2":
      badgeColor = "#C0C0C0"; // 은색
      textColor = "#000000"; // 검정색
      break;
    case "3":
      badgeColor = "#cd7f32"; // 구리색
      textColor = "#FFFFFF"; // 흰색
      break;
    default:
      badgeColor = "#808080"; // 회색
      textColor = "#FFFFFF"; // 흰색
  }

  return (
    <div
      className="absolute top-0 left-0 z-10 flex items-center justify-center w-12 h-12 rounded-full font-bold"
      style={{ backgroundColor: badgeColor, color: textColor }}
    >
      {rank}
    </div>
  );
};

export default RankBadge;
