import React from "react";
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
        <div
          className="flex items-center justify-center min-h-screen "
          onClick={handleOutsideClick}
        >
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 "></div>
          <div className="modal-container bg-white rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <p className="text-red-500 text-lg mb-4 text-center">
                팀원제의는 팀당 2번만 가능합니다.
              </p>
              <div className="button-container flex justify-center ">
                <Link
                  to={`/pictures/apply/${video.id}`}
                  className="image-container relative flex-shrink-0 overflow-hidden"
                >
                  <img
                    src="/imgs/depart.jpg"
                    style={{ width: "200px", height: "200px" }}
                    alt="Button 1"
                    className="rounded-full transition-transform duration-300 transform hover:scale-110 hover:z-10"
                  />

                  <p className="absolute text-white text-center w-full top-1/2 transform -translate-y-1/2 font-bold text-3xl">
                    프로그래머
                  </p>
                </Link>
                <div className="image-container relative flex-shrink-0 overflow-hidden">
                  <button className="bg-transparent p-2 m-0 border-none">
                    <img
                      src="/imgs/skill.jpg"
                      style={{ width: "200px", height: "200px" }}
                      alt="Button 2"
                      className="rounded-full transition-transform duration-300 transform hover:scale-110 hover:z-10"
                    />
                  </button>
                  <p className="absolute text-white text-center w-full top-1/2 transform -translate-y-1/2 font-bold text-3xl">
                    디자이너
                  </p>
                </div>
                <div className="image-container relative flex-shrink-0 overflow-hidden">
                  <button className="bg-transparent p-2 m-0 border-none">
                    <img
                      src="/imgs/part.jpg"
                      style={{ width: "200px", height: "200px" }}
                      alt="Button 3"
                      className="rounded-full transition-transform duration-300 transform hover:scale-110 hover:z-10"
                    />
                  </button>
                  <p className="absolute text-white text-center w-full top-1/2 transform -translate-y-1/2 font-bold text-3xl">
                    기타
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
