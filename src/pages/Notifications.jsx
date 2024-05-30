import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery, useMutation, useQueryClient } from "react-query";
import NotiCard from "../components/NotiCard";
import Footer from "../components/Footer";

export default function Notifications() {
  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });
  const {
    isLoading,
    error,
    data: userData,
  } = useQuery(["userData"], async () => {
    try {
      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/notifications/"
      );
      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData) => {
      await axiosInstance.post("http://127.0.0.1:8000/notifications/", newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userData");
      },
    }
  );

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-black p-12">
        <div>
          {isLoading && <p>Loading...</p>}
          {error && <p>Something is wrong...</p>}
          {userData && (
            <div className="grid grid-cols-3 gap-8 mt-24">
              {userData.map((video) => (
                <div key={video.id}>
                  <NotiCard
                    onClick={() => handleClick(video.user)}
                    video={video}
                    isLoading={mutation.isLoading}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
