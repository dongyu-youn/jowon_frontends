import React from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { Element } from "react-scroll";

export default function About({ scrollToSection }) {
  return (
    <Element name="about" className="section">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src="imgs/jobs.jpeg"
          alt=""
          className="w-2/3 h-2/3 md:w-1/3 md:h-1/3 mr-0 md:mr-40 ml-0 md:ml-40 mt-12 md:mt-40"
        />
        <div
          style={{ whiteSpace: "pre-line" }}
          className="mr-0 md:mr-40 ml-0 md:ml-40 mt-12 md:mt-40 font-diphylleia leading-8 text-center md:text-left"
        >
          <div
            style={{ whiteSpace: "pre-line" }}
            className="font-diphylleia-bold leading-8 text-xl md:text-2xl"
          >
            잡스 - "나의 최고의 작품은 팀이다" <br />
          </div>
          이 홈페이지는 열정적인 활동을 하고 싶지만
          <br /> 같이 뜻을 모을 사람이 부족해 소외된 학생들을 위한
          홈페이지입니다.
          <br /> 팀원 매칭을 통해 자신에게 적합한 팀원들을 만나볼 수 있으며
          <br />
          뜻이 맞는 팀원들과 적합한 대회와 활동을 통해 멋진 대학생활을
          만들어주는 홈페이지입니다.
          <br /> 또한 여러 필터와 카테고리를 통해 쉽고 빠르게 대회들을 찾아볼 수
          있으며
          <br /> 인공지능을 통해 자신과 몇 % 적합한
          <br /> 팀원인지 또한 알아볼 수 있습니다.
        </div>
      </div>
      <div
        className="text-2xl flex justify-center items-center flex-col blinking-text mb-12 mt-12"
        onClick={() => scrollToSection("today")}
      >
        <h1>scroll</h1>
        <BsChevronDoubleDown
          onClick={() => scrollToSection("today")}
          className="text-2xl"
        />
      </div>
    </Element>
  );
}
