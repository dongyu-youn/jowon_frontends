import { Avatar } from "@chakra-ui/react";
import React from "react";
import Avartar from "./Avatar";

export default function ProfileCard({ user, isNew, image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="profile rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      <Avartar image={image} isNew={isNew} />
      <h1 className="text-2xl font-bold mt-4">{user.user_name}</h1>
      <p className="text-lg text-gray-600">{user.department}</p>
    </div>
  );
}
