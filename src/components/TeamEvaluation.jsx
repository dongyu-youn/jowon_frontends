import React, { useState } from "react";
import ValueModal from "./ValueModal";
import MiniProfileCard from "./MiniProfileCard";

const TeamEvaluation = ({ participants, isOpen, onClose }) => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [evaluation, setEvaluation] = useState("");

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
  };

  const handleEvaluationSubmit = () => {
    // 간단한 평가 제출 로직 추가
    console.log(
      `Evaluation for ${selectedParticipant.first_name}: ${evaluation}`
    );
    setEvaluation("");
    setSelectedParticipant(null);
    onClose();
  };

  return (
    <ValueModal isOpen={isOpen} onClose={onClose} title="팀원평가">
      <div className="grid grid-cols-2 gap-4 text-black">
        {participants.map((participant) => (
          <div
            key={participant.id}
            onClick={() => handleParticipantClick(participant)}
          >
            <MiniProfileCard participant={participant} />
          </div>
        ))}
      </div>
      {selectedParticipant && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">
            Evaluate {selectedParticipant.first_name}
          </h3>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Write your evaluation..."
            value={evaluation}
            onChange={(e) => setEvaluation(e.target.value)}
          />
          <button
            className="mt-2 bg-teal-500 text-black px-4 py-2 rounded"
            onClick={handleEvaluationSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </ValueModal>
  );
};

export default TeamEvaluation;
