// components/TeamDisplay.js
import React from "react";

const TeamDisplay = ({ teams }) => {
  return (
    <div>
      {teams.map((team, index) => (
        <div key={index}>
          <h3>Team {index + 1}</h3>
          {team.map((member) => (
            <div key={member.id}>{member.username}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TeamDisplay;
