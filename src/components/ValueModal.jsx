import React from "react";
import { FiX } from "react-icons/fi";

const ValueModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-black">{title}</h2>
          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ValueModal;
