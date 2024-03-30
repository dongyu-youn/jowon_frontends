import React from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { Element, scroller } from "react-scroll";

export default function Home({ scrollToSection }) {
  return (
    <Element name="home" className="section">
      <section id="home" className="relative flex justify-center">
        <video
          src="/videos/home.mp4"
          alt="Your Image Description"
          className="w-full h-screen object-cover "
          autoPlay
          loop
          muted
          playsInline
        ></video>

        <div
          className=" text-2xl flex justify-center items-center flex-col blinking-text absolute bottom-12 "
          onClick={() => scrollToSection("about")}
        >
          <h1>scroll</h1>
          <BsChevronDoubleDown
            onClick={() => scrollToSection("about")}
            className="text-2xl "
          />
        </div>
      </section>
    </Element>
  );
}
