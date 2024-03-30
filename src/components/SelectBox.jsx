import React, { useState } from "react";

export default function SelectBox({ text }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    "사랑",
    "보호받는 마음",
    "안정감",
    "여자의 아픔",
    "아름다움",
    "열등이",
    "강인함",
    "생명력",
    "정신 차리게 하는 에너지",
    "호통",
    "결단력",
    "시원함",
    "잔인함",
    "구도자",
    "집중력",
    "집착",
    "공주가 되고싶은 마음",
    "우울함",
    "욕망",
    "즐거움",
    "청량함",
    "풍요",
    "고급스러움",
    "자유",
    "수치",
    "분별심",
    "권력",
    "지배",
    "해학",
    "시원함",
    "열정",
    "품격",
    "아픔",
    "정열",
    "성관념",
    "유혹",
    "뺏뺏마",
    "살기",
    "결기",
    "버림받은 아픔",
    "치유",
    "가해자",
    "두려움",
    "축복",
    "사랑받고 싶은 마음",
    "유쾌함",
    "욕망",
    "즐거움",
    "풍요",
    "풍요",
    "활력",
    "치유",
    "즐거움",
    "상큼함",
    "기적",
    "신비로움",
    "고급스러움",
    "편안함",
    "품격",
    "생명력",
    "강인함",
    "화려함",
    "가난의 아픔",
    "시원함",
    "정열",
    "희망",
    "희망",
    "찬란함",
    "기원",
    "악마의 마음",
    "동심의 세계",
    "고귀함",
    "귀족적",
    "품위",
    "마음의 안정",
    "기적",
    "용기",
    "자신감",
    "의식의 고양",
    "기적",
    "희망",
    "풍요",
    "긍정적",
    "열정",
    "활력충전",
    "상큼함",
    "기분전환",
    "의식 확장",
    "의식의 고양",
    "꿈과 희망",
    "안정감",
    "즐거움",
    "행복",
    "사모함",
    "간절함",
    "지극함",
    "본래를 향한 사랑",
    "열정적",
    "치유",
  ];

  const toggleSelectBox = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="flex-col justify-end ">
      <div
        onClick={toggleSelectBox}
        className="cursor-pointer border p-2"
        style={{ display: "inline-block" }}
      >
        {text}
      </div>
      {isOpen && (
        <div className="border p-2 flex flex-wrap">
          {options.map((option) => (
            <div className="w-1/4" key={option}>
              <label className="flex p-4 items-center">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <span className="ml-2">{option}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
