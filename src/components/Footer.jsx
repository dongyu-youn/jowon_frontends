import React from "react";
import { FaInstagram } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

export default function Footer() {
  const isPictureDetailPage = window.location.pathname.includes("pictures/");
  const footerClass = `${isPictureDetailPage ? "bg-white text-black" : ""} `;

  const footerPadding = `${
    isPictureDetailPage ? "p-4" : ""
  } m-auto   text-center`;
  return (
    <footer id="contact" class={footerClass}>
      <div className={footerPadding}>
        <h2 className="text-3xl">Let&#39;s talk</h2>
        <p className="text-2xl">donghe1472@gmail.com</p>
        <ul class="flex justify-center gap-4 p-4 text-3xl">
          <li>
            <a
              className="transition-color duration-250 ease-in hover:bg-blue-500"
              href=""
              target="_blank"
              title="my github link"
            >
              <FaInstagram className="hover:text-blue-500 duration-250 ease-in" />
            </a>
          </li>
          <li>
            <a
              className="transition-color duration-250 ease-in hover:bg-blue-500"
              href=""
              target="_blank"
              title="my linkedin link"
            >
              <IoIosCall className="hover:text-blue-500 duration-250 ease-in" />
            </a>
          </li>
        </ul>
        <p>@1조원</p>
      </div>
    </footer>
  );
}
