import logo from "./logo.svg";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import SearchHeader from "./components/SearchHeader";

import { useEffect, useState } from "react";
import pointerImage from "./imgs/yong.jpeg"; // 이미지 파일을 import 합니다.
import { FaComments } from "react-icons/fa"; // react-icons에서 FaComments 아이콘을 import 합니다.
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";

function App() {
  const queryClient = new QueryClient();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const location = useLocation(); // 현재 페이지의 경로를 가져옵니다.

  //마우스 이벤트를 따라다니는 함수
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  // 컴포넌트가 마운트될때 한번만
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); //

  // 채팅 봇 버튼 클릭 핸들러
  const handleChatBotClick = () => {
    // navigate 또는 채팅 봇 활성화 로직을 여기에 추가
    // navigate("/chatbot");
  };
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* 여기에 QueryClientProvider 추가 */}
      <div className="App" style={{ position: "relative" }}>
        {" "}
        <img
          src={pointerImage} // 이미지 파일 경로를 지정합니다.
          alt="Pointer Image"
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            borderRadius: "50%",
            width: "30px", // 이미지의 너비를 지정합니다.
            height: "30px", // 이미지의 높이를 지정합니다.
            zIndex: 9999, // 다른 요소 위에 표시될 수 있도록 zIndex를 설정합니다.
            pointerEvents: "none", // 포인터가 이벤트를 가로채지 않도록 설정합니다.
          }}
        />
        {/* 이 부분에 클래스를 적용합니다. */}
        {/* 특정 페이지에서만 fixed 클래스를 적용하거나 제거합니다. */}
        <SearchHeader></SearchHeader>
        <Outlet className=" w-4 h-4 bg-black rounded-full pointer-events-none z-10 "></Outlet>
        {/* 채팅 봇 버튼 */}
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
