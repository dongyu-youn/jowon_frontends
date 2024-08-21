import React, { useState } from "react";
import Modal from "react-modal";

const CustomModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "10px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
      }}
    >
      <h2>팀원 추가</h2>
      <p>배포 부분에서 가장 높은 점수를 가진 지원자를 팀에 추가하시겠습니까?</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={onConfirm}
        >
          확인
        </button>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#DC3545",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={onRequestClose}
        >
          취소
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
