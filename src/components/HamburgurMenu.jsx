import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5"; // 햄버거 메뉴 아이콘

const HamburgerMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button className="text-2xl p-2 md:hidden" onClick={toggleMenu}>
        {isOpen ? <IoClose /> : <IoMenu />}
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 w-full bg-white shadow-md z-10">
          <ul className="flex flex-col items-start p-4">{children}</ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
