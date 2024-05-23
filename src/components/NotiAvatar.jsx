import React from "react";

export default function NotiAvatar({ video }) {
  return (
    <div>
      <div className="avatar">
        <img className="photo" src={video.image} alt="avatar" />
      </div>
    </div>
  );
}
