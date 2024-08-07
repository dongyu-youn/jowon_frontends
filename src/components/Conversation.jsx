import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaBomb } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { FaFile } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useQueryClient, useQuery } from "react-query"; // 변경된 부분
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import MiniProfileCard from "./MiniProfileCard";
import Footer from "./Footer";
import Slider from "react-slick";
import { Radar } from "react-chartjs-2";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import TeamEvaluation from "./TeamEvaluation";
import { FaTrophy, FaMedal, FaStar, FaCheck, FaUpload } from "react-icons/fa";

const NextArrow = (props) => (
  <div {...props}>
    <IoChevronForwardOutline size={56} className="align-middle" />
  </div>
);

const PrevArrow = (props) => (
  <div {...props}>
    <IoChevronBackOutline size={56} className="align-middle" />
  </div>
);

const Conversation = () => {
  const [isExpanded, setIsExpanded] = useState(true); // 섹션의 확장 상태를 관리합니다.
  const [isThirdExpanded, setIsThirdExpanded] = useState(true); // 세 번째 섹션의 확장 상태를 관리합니다.
  const [messages, setMessages] = useState(""); // 입력된 메시지 상태
  const [loading, setLoading] = useState(false); // 분석 요청 중인지 여부를 나타내는 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [percentages, setPercentages] = useState({});
  const [userData, setUserData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const navigateToNoti = () => {
    navigate("/pictures/messages");
  };

  const customDotStyles = {
    backgroundColor: "black",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  };

  const settings = {
    dots: 3,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const toggleSection = () => {
    // 섹션의 확장 상태를 변경합니다.
    setIsExpanded(!isExpanded);
  };

  const toggleThirdSection = () => {
    setIsThirdExpanded(!isThirdExpanded);
  };

  const userToken = Cookies.get("csrftoken") || "";

  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [video, setVideo] = useState(null);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await axiosInstance.delete(
          `http://127.0.0.1:8000/conversations/${id}`
        );
        if (response.status === 204) {
          alert("팀이 성공적으로 삭제되었습니다.");
          navigateToNoti();
        }
      } catch (error) {
        console.error("팀 삭제 중 오류 발생:", error);
        alert("팀 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axiosInstance.get(
          `http://127.0.0.1:8000/conversations/${id}`
        ); // id 값을 이용하여 서버로 요청
        setVideo(response.data);
        console.log(response.data.teamName);
        console.log(response.data.ai_response);
        calculateAverages(response.data.ai_response); // ai_response 데이터를 calculateAverages 함수에 전달
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  const calculateAverages = (aiResponse) => {
    const averages = aiResponse.map((response) => {
      if (response.score) {
        const performance = calculatePerformance(response.score);
        const experience = calculateExperience(response.score);
        const result = calculateResult(response.score);
        const trust = response.score.trust || 0;
        const creativity = response.score.creativity || 0;

        console.log(`User: ${response.username}`);
        console.log(`Performance: ${performance}`);
        console.log(`Experience: ${experience}`);
        console.log(`Result: ${result}`);
        console.log(`Trust: ${trust}`);
        console.log(`Creativity: ${creativity}`);

        return {
          performance,
          experience,
          result,
          trust,
          creativity,
        };
      } else {
        console.log(`User: ${response.username}`);
        console.log("No score available");

        return {
          performance: 0,
          experience: 0,
          result: 0,
          trust: 0,
          creativity: 0,
        };
      }
    });

    setPercentages(averages);
  };

  const calculatePerformance = (score) => {
    return (
      (
        (score.grade * 0.2 +
          score.github_commit_count * 0.2 +
          score.baekjoon_score * 0.2 +
          score.programmers_score * 0.2 +
          score.certificate_count * 0.2) /
        5
      ).toFixed(2) * 10
    );
  };

  const calculateExperience = (score) => {
    return (
      (
        (score.depart * 0.25 +
          score.courses_taken * 0.25 +
          score.major_field * 0.25 +
          score.bootcamp_experience * 0.25) /
        4
      ).toFixed(2) * 100
    );
  };

  const calculateResult = (score) => {
    return (
      (
        (score.in_school_award_cnt * 0.5 +
          score.out_school_award_cnt * 0.5 +
          score.coding_test_score * 0.5 +
          score.certificate_score * 0.5 +
          score.aptitude_test_score * 0.5) /
        5
      ).toFixed(2) * 10
    );
  };

  // 레이더 차트 데이터를 percentages 상태에 기반하여 설정
  const data = {
    labels: ["성과", "성실도", "경험", "신뢰도", "창의성"],
    datasets: [
      {
        label: "팀원 1 데이터",
        data: [
          percentages[0] ? percentages[0].result : 0,
          percentages[0] ? percentages[0].performance : 0,
          percentages[0] ? percentages[0].experience : 0,
          percentages[0] ? percentages[0].trust : 0,
          percentages[0] ? percentages[0].creativity : 0,
        ],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "팀원 2 데이터",
        data: [
          percentages[1] ? percentages[1].result : 0,
          percentages[1] ? percentages[1].performance : 0,
          percentages[1] ? percentages[1].experience : 0,
          percentages[1] ? percentages[1].trust : 0,
          percentages[1] ? percentages[1].creativity : 0,
        ],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "팀원 3 데이터",
        data: [
          percentages[2] ? percentages[2].result : 0,
          percentages[2] ? percentages[2].performance : 0,
          percentages[2] ? percentages[2].experience : 0,
          percentages[2] ? percentages[2].trust : 0,
          percentages[2] ? percentages[2].creativity : 0,
        ],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        grid: {
          color: "#fff", // 레이더 그리드의 색상을 흰색으로 설정
        },
        pointLabels: {
          display: true,
          font: {
            size: 20, // 라벨 글자 크기를 24px로 설정합니다.
          },
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
    layout: {
      padding: {
        top: 100, // 상단 패딩을 50px로 설정하여 그래프를 아래로 내립니다.
      },
    },
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  // 메시지 전송 함수
  const sendMessage = async () => {
    try {
      // 서버에 메시지를 전송하는 POST 요청
      const conversationId = window.location.pathname.split("/").pop(); // URL에서 대화의 ID 추출
      await axiosInstance.post(
        `http://127.0.0.1:8000/conversations/messages/`,
        {
          message: messages, // 메시지 내용
          conversation_id: id,
          conversation: id,
        }
      );

      // 메시지 전송 후 입력 창 비우기
      setMessages("");
      // 전송 후 새로고침
      window.location.reload();

      // 전송 완료 후 필요한 추가 작업 수행 가능
    } catch (error) {
      console.error("Error sending message:", error);
      // 오류 처리 로직 추가 가능
    }
  };
  // const graphUrl = `data:image/png;base64,${video.graph[2]}`;

  // const analyzePotential = async () => {
  //   const conversationId = id; // 해당 conversation ID를 적절히 설정
  //   try {
  //     const response = await axios.delete(
  //       `http://127.0.0.1:8000/conversations/${id}`
  //     );
  //     console.log("Conversation deleted successfully:", response.data);
  //     // 삭제 후 추가적인 로직을 여기에 추가 (예: 페이지 리디렉션)
  //     alert("삭제되었습니다");
  //   } catch (error) {
  //     console.error("Failed to delete conversation:", error);
  //   }
  // };

  const graphImages = [
    "/imgs/png1.png",
    "/imgs/png2.png",
    "/imgs/png3.png",
    "/imgs/png4.png",
  ];

  // const predictions = video.participants.map((participant, index) => {
  //   const prediction = video.ai_response[index][randomContest];
  //   return prediction;
  // });

  // const averagePrediction = (
  //   predictions.reduce((acc, val) => acc + val, 0) / predictions.length
  // ).toFixed(2);

  const participantIds = video.participants.map(
    (participant) => participant.id
  );

  const isSameMatchingType = video.matching_type === "same";
  const isTopMatchingType = video.matching_type === "top_two";

  return (
    <section id="home" className="">
      <div className="relative w-full h-0" style={{ paddingBottom: "40%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/videos/jown.jpeg"
            alt="Your Image Description"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-white text-5xl font-serif">
            Team's talking
          </h1>
        </div>
      </div>
      <div className="container mx-auto my-10 mt-32 flex justify-between min-h-50vh">
        <div className="flex justify-center">
          <button onClick={toggleSection} className="focus:outline-none">
            {!isExpanded ? (
              <FiChevronLeft size={64} />
            ) : (
              <FiChevronRight size={64} />
            )}
          </button>
        </div>
        <div className={`border w-1/4 p-10 ${isExpanded ? "" : "hidden"}`}>
          <span className="text-center w-full block text-lg font-medium">
            <h2>Conversation for </h2>
          </span>
          <div className="grid grid-cols-2 justify-between mt-10 items-center">
            {video.participants.map((participant, index) => (
              <MiniProfileCard
                key={participant.id}
                participant={participant}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>
        <div className="border flex-grow ml-10 p-10 flex flex-col">
          <div className="border mb-6 flex items-center justify-center rounded p-2">
            {video.teamName}
          </div>
          {video.messages.map((message, index) => (
            <div
              key={index}
              className={`mb-10 flex items-center ${
                message.user.id !== 1 ? "flex-row-reverse" : ""
              }`}
            >
              <img
                alt={message.user.username}
                src={message.user.avatar}
                className={`w-20 h-20 rounded-full ml-4 ${
                  message.user.id !== 1
                    ? "bg-teal-500 text-black"
                    : "bg-gray-300"
                }`}
              />
              <div
                className={`p-5 rounded ${
                  message.user.id !== 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
                style={{
                  marginLeft: message.user.id !== 1 ? "0" : "12px",
                  color: message.user.id === 1 ? "black" : "",
                }}
              >
                <div>{message.message}</div>
              </div>
            </div>
          ))}
          <div className="mt-6 flex items-center w-full justify-center text-black">
            <input
              type="text"
              className="rounded w-10/12 border-gray-300 border p-2 mr-2 focus:outline-none focus:border-teal-500"
              placeholder="메시지를 입력하세요..."
              value={messages}
              onChange={(e) => setMessages(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-teal-500 text-white px-10 items-center rounded focus:outline-none flex"
              style={{ flexDirection: "row" }}
            >
              <span className="w-8 py-3">전송</span>
            </button>
          </div>
        </div>
        <div
          className={`border w-1/4 p-10 ml-12 flex justify-center flex-col ${
            isThirdExpanded ? "" : "hidden"
          }`}
        >
          <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer ">
            <FaImage className="mr-4" size={24} /> <>사진/동영상</>
          </button>
          <div className="flex justify-between mt-10 items-center"></div>
          <button className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer ">
            <FaFile className="mr-4" size={24} /> <>파일</>
          </button>
          <div className="flex justify-between mt-10 items-center"></div>
          <button
            className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer"
            onClick={handleDelete}
          >
            <FaBomb className="mr-4" size={24} /> <>팀파기</>
          </button>

          <div className="flex justify-between mt-10 items-center"></div>

          <button
            className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-white text-black items-center hover:bg-black hover:text-white cursor-pointer "
            onClick={() => document.getElementById("fileInput").click()}
          >
            <FaStar className="mr-4" size={24} /> <>성과올리기</>
          </button>
          <input type="file" id="fileInput" style={{ display: "none" }} />

          <div className="flex justify-between mt-10 items-center"></div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center align-top relative p-4 font-customFont hover:underline bg-red-400 text-black items-center hover:bg-black hover:text-white cursor-pointer "
          >
            <FiX className="mr-4" size={24} /> <>활동종료</>
          </button>
        </div>
        <div className="flex justify-center">
          <button onClick={toggleThirdSection} className="focus:outline-none">
            {!isThirdExpanded ? (
              <FiChevronRight size={64} />
            ) : (
              <FiChevronLeft size={64} />
            )}
          </button>
        </div>
      </div>
      {video.matching_type !== "random" && (
        <div className={`border p-10 container mx-auto min-h-80 mt-24 mb-40`}>
          {isSameMatchingType ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "800px", height: "800px" }}>
                <Radar data={data} options={options} />
              </div>
            </div>
          ) : video.matching_type === "top_two" ? (
            <div>
              <div className="grid grid-cols-2 gap-3 mt-10 items-start">
                {video.ai_response.slice(0, 4).map((prediction, index) => {
                  const predictionValue =
                    prediction.predictions["GCGF 혁신 아이디어 공모"].toFixed(
                      2
                    ); // 예측 값을 가져옵니다.
                  return (
                    <div key={prediction.user_id} className="flex items-start">
                      <div className="mr-4">
                        <MiniProfileCard participant={prediction} />
                      </div>
                      <div>
                        <p className="text-sm">
                          <strong>{prediction.user_name}</strong> 님은 총{" "}
                          <strong>{predictionValue}%</strong>의 확률로 성공할
                          것으로 분석되었습니다. 이는 대회에서 중요한 학점과
                          끈기 부분에서 높은 점수를 보였기 때문입니다.
                        </p>
                        <div className="flex items-center mt-2">
                          <div className="w-20 h-4 bg-gray-300 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${predictionValue}%` }}
                            ></div>
                          </div>
                          <p className="ml-2 text-lg font-bold">
                            {predictionValue}%
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-10">
                <Slider {...settings}>
                  {graphImages.map((image, index) => (
                    <div key={index} className="flex justify-center">
                      <img src={image} alt={`분석 그래프 ${index + 1}`} />
                    </div>
                  ))}
                </Slider>
                <p className="text-3xl font-bold mt-4">
                  {/* 전체 확률: {averagePrediction} */}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      )}

      <TeamEvaluation
        participants={video.participants}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Conversation;
