import React, { useState } from "react";
import Button from "../components/Button";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import ModalComponent from "../components/Modal";

export default function PictureDetail({}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장하는 state

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 버튼 클릭 시 모달 열기
  const handleButtonClick = () => {
    openModal();
  };

  // 모달 영역 외의 곳을 클릭했을 때 모달을 닫기 위한 함수
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <>
      <section
        className="flex flex-col md:flex-row p-4 items-center justify-center"
        onClick={handleOutsideClick}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/v2ce2510126f0ef15e82906ced41e86e84.jpg?alt=media&token=86fa46c0-1140-41c8-9951-176dd51bbebe"
          className="w-1/6 px-20 basis-5/12"
        />

        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-4xl font-bold py-2 mb-12 font-dongle_semibolde">
            제11회 산업안전보건 조사자료 논문 경진대회
          </h2>
          <p className="text-2xl font-bold py-2  mb-4 font-dongle">
            학과 : 컴소공
          </p>
          <p className="text-2xl font-bold py-2 mb-8 font-dongle">
            상금 : 2000000
          </p>
          <p className="py-4 text-2xl  border-b border-gray-400 mb-12 font-dongle_light">
            분야 : 논문
          </p>
          <Button
            className="mt-20"
            text="팀원조회"
            onClick={handleButtonClick}
          />
        </div>
      </section>

      {/* 모달 */}
      {isModalOpen && <ModalComponent closeModal={closeModal} />}

      <Footer />
    </>
  );
}
