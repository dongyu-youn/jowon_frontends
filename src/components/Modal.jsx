import React, { useState } from "react";
import { Link } from "react-router-dom";

function ModalComponent({ closeModal, video }) {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto ">
        <div className="flex items-center justify-center min-h-screen ">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 "></div>
          <div className="modal-container bg-white   rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="button-container flex justify-center ">
                <Link
                  to={`/pictures/apply/${video.id}`}
                  className="image-container relative"
                >
                  <Link
                    to={`/pictures/apply/${video.id}`}
                    className="bg-transparent p-2 m-0 border-none "
                  >
                    <img
                      src="/imgs/depart.jpg"
                      style={{ width: "200px", height: "200px" }}
                      alt="Button 1"
                      className="rounded-full"
                    />
                  </Link>
                  <p className="absolute text-white text-center w-full top-1/2 transform -translate-y-1/2 font-bold text-3xl">
                    학과별
                  </p>
                </Link>
                <div className="image-container relative">
                  <button className="bg-transparent p-2 m-0 border-none">
                    <img
                      src="/imgs/skill.jpg"
                      style={{ width: "200px", height: "200px" }}
                      alt="Button 2"
                      className="rounded-full"
                    />
                  </button>
                  <p className="absolute text-white text-center w-full top-1/2 transform -translate-y-1/2 font-bold text-3xl">
                    실력별
                  </p>
                </div>
                <div className="image-container relative">
                  <button className="bg-transparent p-2 m-0 border-none">
                    <img
                      src="/imgs/part.jpg"
                      style={{ width: "200px", height: "200px" }}
                      alt="Button 3"
                      className="rounded-full"
                    />
                  </button>
                  <p className="absolute text-white text-center w-full top-1/2 transform -translate-y-1/2 font-bold text-3xl">
                    업무별
                  </p>
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;
