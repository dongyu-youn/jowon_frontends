import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";

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

import axios from "axios"; // axios를 import합니다.

export default function List_Pictures() {
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

  return (
    <div className="bg-white text-black p-12">
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
        {videos && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4 ">
            {videos.map((video) => (
              <PictureCard key={video.id} video={video}></PictureCard>
            ))}

            <div className="flex items-center justify-center blinking-text ">
              <h1 className="text-3xl mb-2 font-diphylleia ">more</h1>
              <IoIosArrowRoundBack className="text-3xl ml-1 font-diphylleia " />{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
