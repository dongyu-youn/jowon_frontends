import React, { useEffect, useState } from "react";

import axios from "axios";

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

import { useForm } from "react-hook-form";
import Footer from "../components/Footer";

export default function Search() {
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
    right: 100px;
  `;

  const location = useLocation();
  const { state } = location;

  const [departmentChecked, setDepartmentChecked] = React.useState(false);
  const [latestChecked, setLatestChecked] = React.useState(false);
  const [periodChecked, setPeriodChecked] = React.useState(false);
  const [onlineOfflineChecked, setOnlineOfflineChecked] = React.useState(false);
  const [personalTeamChecked, setPersonalTeamChecked] = React.useState(false);
  const [customFilteringChecked, setCustomFilteringChecked] =
    React.useState(false);

  const { keyword } = useParams();
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery(["videos"], {
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/contests/");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });
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

  const handleSortByLatest = () => {
    setLatestChecked(!latestChecked);
    // 최신순으로 정렬하는 함수
  };

  const handleSortByPeriod = () => {
    setPeriodChecked(!periodChecked);
    // 기간순으로 정렬하는 함수
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

  const [contents, setContents] = useState([]);

  useEffect(() => {
    // URLSearchParams 를 사용하여 현재
    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams);
    const keyword = queryParams.get("keyword");
    console.log(keyword);
    // axios를 사용하여 HTTP 요청 보내기
    axios
      .get(`http://127.0.0.1:8000/contests/search/?keyword=${keyword}`)
      .then((response) => {
        // 받은 데이터를 상태로 설정
        setContents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contests:", error);
      });
  }, []);

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
        {contents && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4 ">
            {contents.map((video) => (
              <PictureCard key={video.id} video={video}></PictureCard>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center blinking-text ">
          <h1 className="text-3xl mb-2 font-diphylleia ">more</h1>
          <IoIosArrowRoundBack className="text-3xl ml-1 font-diphylleia " />{" "}
        </div>
      </div>
      <Footer />
    </div>
  );
}
