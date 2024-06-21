import React, { useState } from "react";

export default function SelectBox({ text }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [];

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
