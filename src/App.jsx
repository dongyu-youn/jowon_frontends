import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SearchHeader from "./components/SearchHeader";
import pointerImage from "./imgs/yong.jpeg";
import { FaComments } from "react-icons/fa";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import fetchCSRFToken from "./utils/fetchCSRFToken";

const queryClient = new QueryClient();

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const initialize = async () => {
      await fetchCSRFToken();
      console.log("CSRF token initialization complete");
    };

    initialize();
  }, []);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleChatBotClick = () => {
    // navigate 또는 채팅 봇 활성화 로직을 여기에 추가
    // navigate("/chatbot");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App" style={{ position: "relative" }}>
        <img
          src={pointerImage}
          alt="Pointer Image"
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />
        <SearchHeader />
        <Outlet className="w-4 h-4 bg-black rounded-full pointer-events-none z-10" />
        <div
          onClick={handleChatBotClick}
          className="fixed bottom-5 right-5 w-16 h-16 rounded-full bg-red-800 flex items-center justify-center shadow-lg cursor-pointer z-50"
        >
          <FaComments className="text-white w-6 h-6" />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
