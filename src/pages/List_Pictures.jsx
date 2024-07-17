import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import PictureCard from "../components/PictureCard";
import SelectBox from "../components/SelectBox";
import axios from "axios";
import Cookies from "js-cookie";
import Filtering from "../components/Filtering";
import { useFetchContests } from "../hooks/useFetchContests"; // 위에서 만든 커스텀 훅을 import
import { fetchFilteredContests } from "../utils/fetchFilteredContests"; // 필터링 로직 함수 import
import axiosInstance from "../utils/axiosInstance";
import { logDOM } from "@testing-library/react";

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
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
`;

export default function List_Pictures() {
  const location = useLocation();
  const { state } = location;
  const { keyword } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [page, setPage] = useState(1);
  const { data: videos, isLoading, error } = useFetchContests(page);
  const [latestVideos, setLatestVideos] = useState([]);
  const [periodVideos, setPeriodVideos] = useState([]);
  const [departVideos, setDepartVideos] = useState([]);
  const [departmentChecked, setDepartmentChecked] = useState(false);
  const [latestChecked, setLatestChecked] = useState(false);
  const [periodChecked, setPeriodChecked] = useState(false);
  const [onlineOfflineChecked, setOnlineOfflineChecked] = useState(false);
  const [personalTeamChecked, setPersonalTeamChecked] = useState(false);
  const [customFilteringChecked, setCustomFilteringChecked] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState([]); // 필터링된 비디오 상태 추가

  const handleSortByDepartment = async () => {
    setDepartmentChecked(!departmentChecked);
    try {
      // 사용자 정보를 가져옵니다.
      const userResponse = await axiosInstance.get(
        "http://127.0.0.1:8000/users/me/",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`, // 필요한 경우 인증 헤더 추가
          },
        }
      );
      const userData = userResponse.data;
      const userDepartment = userData.학과; // 사용자의 학과 정보를 가져옵니다.

      // 필터링된 대회 목록을 가져옵니다.
      const filteredResponse = await axios.get(
        `http://127.0.0.1:8000/contests/filtered/?연관학과=${userDepartment}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`, // 필요한 경우 인증 헤더 추가
          },
        }
      );
      const filteredResults = filteredResponse.data.results; // results 값을 가져옵니다.
      setFilteredVideos(filteredResults);
      console.log(filteredResponse.data.results);
    } catch (error) {
      console.error("Error handling sorting by department: ", error);
    }
  };

  const handleSortByLatest = async () => {
    setLatestChecked(!latestChecked);
    try {
      const data = await fetchFilteredContests("latest");
      console.log(data);
      setLatestVideos(data);
    } catch (error) {
      console.error("Error sorting by latest:", error);
    }
  };

  const handleSortByPeriod = async () => {
    setPeriodChecked(!periodChecked);
    try {
      const data = await fetchFilteredContests("prize");
      setPeriodVideos(data);
    } catch (error) {
      console.error("Error sorting by period:", error);
    }
  };

  const handleToggleOnlineOffline = () => {
    setOnlineOfflineChecked(!onlineOfflineChecked);
  };

  const handleTogglePersonalTeam = () => {
    setPersonalTeamChecked(!personalTeamChecked);
  };

  const handleCustomFiltering = () => {
    setCustomFilteringChecked(!customFilteringChecked);
  };

  const toggleSearch = () => setSearchOpen((prev) => !prev);

  const handleMouseEnter = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  const onValid = (data) => {
    navigate(`/pictures/search?keyword=${data.keyword}`);
  };

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
        {!departmentChecked && !periodChecked && !latestChecked && videos && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4 ">
            {videos.results.map((video) => (
              <PictureCard key={video.id} video={video}></PictureCard>
            ))}
          </div>
        )}
        {latestChecked && latestVideos && (
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
        {periodChecked && periodVideos && (
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
        {departmentChecked && filteredVideos && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4 ">
            {filteredVideos.map((video) => (
              <PictureCard key={video.id} video={video}></PictureCard>
            ))}
            <div className="flex items-center justify-center blinking-text ">
              <h1 className="text-3xl mb-2 font-diphylleia ">More</h1>
              <IoIosArrowRoundBack className="text-3xl ml-1 font-diphylleia " />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className={`bg-pink-800 text-white font-bold py-2 px-4 rounded mr-2 ${
            !videos || !videos.previous ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={!videos || !videos.previous}
        >
          Previous
        </button>
        <button
          className={`bg-pink-800 text-white font-bold py-2 px-4 rounded ml-2 ${
            !videos || !videos.next ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={!videos || !videos.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}
