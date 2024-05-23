import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import PictureCard from "../components/PictureCard";
import SelectBox from "../components/SelectBox";
import { useQueryClient, useQuery } from "react-query"; // 변경된 부분
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import Filtering from "../components/Filtering";
import { FaSearch } from "react-icons/fa";

import axios from "axios"; // axios를 import합니다.

import Cookies from "js-cookie";

import { useForm } from "react-hook-form";

export default function List_Pictures() {
  const Search = styled.form`
    position: relative;
    color: black;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    svg {
      height: 35px;
    }
  `;

  const Input = styled(motion.input)`
    position: absolute;

    width: 300px; /* 너비를 더 크게 조정하세요 */
    padding: 10px; /* 내부 여백을 추가하여 내용이 너무 가깝게 보이지 않도록 합니다. */
    border: 1px solid #ccc; /* 테두리를 추가하여 입력란의 모양을 더 강조합니다. */
    border-radius: 5px; /* 둥근 테두리를 적용합니다. */
    transition: border-color 0.3s; /* hover 효과를 추가합니다. */
  `;

  const location = useLocation();
  const { state } = location;

  const [latestVideos, setLatestVideos] = useState([]); // 최신순으로 정렬된 데이터 상태
  const [periodVideos, setPeriodVideos] = useState([]);

  const [departmentChecked, setDepartmentChecked] = React.useState(false);
  const [latestChecked, setLatestChecked] = React.useState(false);
  const [periodChecked, setPeriodChecked] = React.useState(false);
  const [onlineOfflineChecked, setOnlineOfflineChecked] = React.useState(false);
  const [personalTeamChecked, setPersonalTeamChecked] = React.useState(false);
  const [customFilteringChecked, setCustomFilteringChecked] =
    React.useState(false);

  const { keyword } = useParams();
  const [page, setPage] = useState(1);
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery(["videos", page], {
    queryFn: async () => {
      const res = await fetch(`http://127.0.0.1:8000/contests/?page=${page}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    keepPreviousData: true, // 이전 데이터를 유지하여 페이지 이동 시 부드러운 사용자 경험 제공
  });

  console.log("videos:", videos); // videos 변수를 콘솔에 출력
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = async (page) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/contests/?page=${page}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      // 데이터 처리 로직 추가
    } catch (error) {
      console.error("Error fetching paginated contests:", error);
    }
  };

  const [filteredVideos, setFilteredVideos] = useState([]); // 필터링된 데이터 상태 추가

  useEffect(() => {
    handleSortByDepartment();
  }, []);

  const handleSortByDepartment = async () => {
    try {
      const userResponse = await axios.get("http://127.0.0.1:8000/contests/");

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = userResponse.data;
      const userDepartment = videos.연관학과;

      const filteredResponse = await axios.get(
        `http://127.0.0.1:8000/contests/filtered/?연관학과=${userDepartment}`
      );

      if (!filteredResponse.ok) {
        throw new Error("Failed to fetch filtered data");
      }
      const filteredData = filteredResponse.data;
      setFilteredVideos(filteredData); // 필터링된 데이터 상태 설정
      console.log(filteredData);
    } catch (error) {
      console.error("Error handling sorting by department: ", error);
    }
  };

  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  const handleSortByLatest = () => {
    setLatestChecked(!latestChecked);
    // 최신순으로 정렬하는 함수

    // 최신순으로 정렬할 때 latest=true 매개변수를 추가하여 요청을 보냄
    axiosInstance
      .get("http://127.0.0.1:8000/contests/filtered-contests/?latest=true")
      .then((response) => {
        // 요청 성공 시 데이터 처리
        // 여기서 서버에서 응답한 데이터를 사용하여 UI를 업데이트할 수 있습니다.
        setLatestVideos(response.data); // 최신순으로 정렬된 데이터를 설정합니다.
      })
      .catch((error) => {
        // 요청 실패 시 에러 처리
        console.error("Error sorting by latest:", error);
      });
  };

  const handleSortByPeriod = () => {
    setPeriodChecked(!periodChecked);
    // 상금순으로 정렬하는 함수

    axiosInstance
      .get("http://127.0.0.1:8000/contests/filtered-contests/?prize=true")

      .then((response) => {
        // 요청 성공 시 데이터 처리
        // 여기서 서버에서 응답한 데이터를 사용하여 UI를 업데이트할 수 있습니다.
        console.log(response.data); // 응답 데이터를 콘솔에 출력하여 확인
        setPeriodVideos(response.data); // 최신순으로 정렬된 데이터를 설정합니다.
      })
      .catch((error) => {
        // 요청 실패 시 에러 처리
        console.error("Error sorting by latest:", error);
      });
  };

  const handleToggleOnlineOffline = () => {
    setOnlineOfflineChecked(!onlineOfflineChecked);
    // 온/오프라인을 토글하는 함수
  };

  const handleTogglePersonalTeam = () => {
    setPersonalTeamChecked(!personalTeamChecked);
    // 개인/팀을 토글하는 함수
  };

  const handleCustomFiltering = () => {
    setCustomFilteringChecked(!customFilteringChecked);
    // 맞춤 필터링을 수행하는 함수
  };

  const [searchOpen, setSearchOpen] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const toggleSearch = () => setSearchOpen((prev) => !prev);

  const handleMouseEnter = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  // 검색 로직

  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    console.log(data);
    navigate(`/pictures/search?keyword=${data.keyword}`);
  };

  const navigate = useNavigate();

  return (
    <div className="bg-white text-black p-12">
      <Search className="flex justify-end" onSubmit={handleSubmit(onValid)}>
        <motion.svg
          onClick={toggleSearch}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </motion.svg>

        <Input
          {...register("keyword", { required: true, minLength: 2 })}
          style={{ transform: searchOpen ? "scaleX(1)" : "scaleX(0)" }}
          placeholder="원하는 대회를 검색해보세요"
        />
      </Search>
      <Filtering
        departmentChecked={departmentChecked}
        latestChecked={latestChecked}
        periodChecked={periodChecked}
        onlineOfflineChecked={onlineOfflineChecked}
        personalTeamChecked={personalTeamChecked}
        customFilteringChecked={customFilteringChecked}
        handleSortByDepartment={handleSortByDepartment}
        handleSortByLatest={handleSortByLatest}
        handleSortByPeriod={handleSortByPeriod}
        handleToggleOnlineOffline={handleToggleOnlineOffline}
        handleTogglePersonalTeam={handleTogglePersonalTeam}
        handleCustomFiltering={handleCustomFiltering}
      />

      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Something is wrong...</p>}
        {!periodChecked && !latestChecked && videos && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4 ">
            {videos.results.map((video) => (
              <PictureCard key={video.id} video={video}></PictureCard>
            ))}
          </div>
        )}

        {latestChecked &&
          latestVideos && ( // latestChecked가 true이고 latestVideos 상태가 있을 때
            <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4 ">
              {latestVideos.map((video) => (
                <PictureCard key={video.id} video={video}></PictureCard>
              ))}
              <div className="flex items-center justify-center blinking-text ">
                <h1 className="text-3xl mb-2 font-diphylleia ">More</h1>
                <IoIosArrowRoundBack className="text-3xl ml-1 font-diphylleia " />
              </div>
            </div>
          )}

        {periodChecked &&
          periodVideos && ( // latestChecked가 true이고 latestVideos 상태가 있을 때
            <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4 ">
              {periodVideos.map((video) => (
                <PictureCard key={video.id} video={video}></PictureCard>
              ))}
              <div className="flex items-center justify-center blinking-text ">
                <h1 className="text-3xl mb-2 font-diphylleia ">More</h1>
                <IoIosArrowRoundBack className="text-3xl ml-1 font-diphylleia " />
              </div>
            </div>
          )}
      </div>
      <div>
        {/* 컨텐츠 렌더링 */}
        <div className="flex justify-center mt-4">
          <button
            className={`bg-pink-800 text-white font-bold py-2 px-4 rounded mr-2 ${
              !videos || !videos.previous ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevPage}
            disabled={!videos || !videos.previous}
          >
            Previous
          </button>
          <button
            className={`bg-pink-800 text-white font-bold py-2 px-4 rounded ml-2 ${
              !videos || !videos.next ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextPage}
            disabled={!videos || !videos.next}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
