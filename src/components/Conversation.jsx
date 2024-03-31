import React from "react";

const Conversation = () => {
  // 가상의 데이터 생성
  const conversation = {
    participants: [
      {
        id: 1,
        first_name: "윤동규",
        avatar: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        first_name: "이한세",
        avatar: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        first_name: "김민혁",
        avatar: "https://via.placeholder.com/150",
      },
      // 추가 팀원들을 추가할 수 있습니다.
    ],
    messages: [
      {
        id: 1,
        user: { id: 1, first_name: "윤동규" },
        message: "안녕하세요!",
      },
      { id: 2, user: { id: 2, first_name: "이한세" }, message: "Hi!" },
      { id: 3, user: { id: 3, first_name: "김민혁" }, message: "안녕ㄴㅇ!" },
      // 추가 메시지들을 추가할 수 있습니다.
    ],
  };

  return (
    <section id="home" className="">
      <div className="relative w-full h-0" style={{ paddingBottom: "40%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/imgs/pic.jpg"
            alt="Your Image Description"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-white text-5xl font-serif">
            Team's talking
          </h1>
        </div>
      </div>
      <div className="container mx-auto my-10 mt-32 flex justify-between min-h-50vh">
        <div className="border w-1/4 p-10">
          <span className="text-center w-full block text-lg font-medium">
            <h2>Conversation for </h2>
          </span>
          <div className="flex justify-between mt-10 items-center">
            {conversation.participants.map((user, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="rounded-full w-16 h-16"
                />
                <span
                  className={`mt-2 text-gray-500 ${
                    user.id === 1 ? "text-black" : ""
                  }`}
                >
                  {user.first_name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="border flex-grow ml-10 p-10 flex flex-col">
          {conversation.messages.map((message, index) => (
            <div
              key={index}
              className={`mb-10 flex items-center ${
                message.user.id !== 1 ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full   ml-4 ${
                  message.user.id !== 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {message.user.first_name.substring(0, 1)}
              </div>
              <div
                className={`p-5 rounded ${
                  message.user.id !== 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300 text-black" // 첫 번째 요소일 때 텍스트 색상을 검은색으로 변경
                }`}
                style={{
                  marginLeft: message.user.id !== 1 ? "0" : "12px",
                  color: message.user.id === 1 ? "black" : "", // 윤 프로필의 글자는 검은색으로 지정
                }}
              >
                <div>{message.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Conversation;
