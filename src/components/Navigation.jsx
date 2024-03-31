import React, { useState } from "react";

import { Link } from "react-router-dom";

import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

export default function Navigation() {
  const [isHovered, setIsHovered] = useState(false);

  const [isHeight, setIsHeight] = useState(false);

  return (
    <div className="">
      <ul className="flex  items-center ">
        <li className="inline-block align-top relative p-4 font-customFont  hover:underline ">
          <Link to="/" className="hover:text-pink-800 pr-8 " href="">
            Home
          </Link>
          <div
            className={`border-b  ${isHovered ? "visible" : "hidden"}`}
          ></div>
        </li>

        <li className="inline-block align-top relative p-4 font-customFont hover:underline ">
          <Link
            to="/pictures"
            class="header__menu__item hover:text-pink-800 pr-8"
            href=""
          >
            contests
          </Link>
        </li>

        <li className="inline-block align-top relative p-4 font-customFont hover:underline">
          <a
            class="header__menu__item hover:text-pink-800 pr-8"
            href="{% url 'lists:see-favs' %}"
          >
            Favs
          </a>
        </li>

        <li className="inline-block align-top relative p-4 font-customFont   hover:underline pr-8 ">
          <a className="hover:text-pink-800">Profile</a>
        </li>

        <Link
          to="/pictures/messages"
          className="flex align-top relative p-4 font-customFont hover:underline bg-black text-white items-center hover:bg-white hover:text-black"
        >
          {/* <a
            class="header__menu__item hover:text-pink-800 pr-8"
            href="{% url 'lists:see-favs' %}"
          ></a> */}
          team matching
          <IoChevronForwardOutline />
        </Link>
      </ul>
    </div>
  );
}
