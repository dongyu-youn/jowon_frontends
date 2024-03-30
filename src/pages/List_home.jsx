import React from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { Element, scroller } from "react-scroll";
import Today from "./Today";
import List_Pictures from "./List_Pictures";

export default function List_home() {
  return (
    <section id="home" className="">
      <div className="relative w-full h-0" style={{ paddingBottom: "40%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/imgs/pic.jpg"
            alt="Your Image Description"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-white text-5xl font-serif">Contests</h1>
        </div>
      </div>
      <List_Pictures></List_Pictures>
    </section>
  );
}
