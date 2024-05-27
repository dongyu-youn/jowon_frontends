import React from "react";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";

const Filtering = ({
  departmentChecked,
  latestChecked,
  periodChecked,
  onlineOfflineChecked,
  personalTeamChecked,
  customFilteringChecked,
  handleSortByDepartment,
  handleSortByLatest,
  handleSortByPeriod,
  handleToggleOnlineOffline,
  handleTogglePersonalTeam,
  handleCustomFiltering,
}) => {
  return (
    <div className="flex justify-end space-x-4">
      <button
        onClick={handleSortByDepartment}
        className="btn flex items-center"
      >
        {departmentChecked ? (
          <RiCheckboxCircleFill />
        ) : (
          <RiCheckboxBlankCircleFill size={24} />
        )}
        학과순
      </button>
      <button onClick={handleSortByLatest} className="btn flex items-center">
        {latestChecked ? (
          <RiCheckboxCircleFill />
        ) : (
          <RiCheckboxBlankCircleFill size={24} />
        )}
        최신순
      </button>
      <button onClick={handleSortByPeriod} className="btn flex items-center">
        {periodChecked ? (
          <RiCheckboxCircleFill />
        ) : (
          <RiCheckboxBlankCircleFill size={24} />
        )}
        상금순
      </button>

      <button onClick={handleCustomFiltering} className="btn flex items-center">
        {customFilteringChecked ? (
          <RiCheckboxCircleFill />
        ) : (
          <RiCheckboxBlankCircleFill size={24} />
        )}
        맞춤 필터링
      </button>
      <button
        onClick={handleToggleOnlineOffline}
        className={`btn flex items-center ${
          onlineOfflineChecked ? "text-blue-500" : "text-pink-800"
        }`}
      >
        {onlineOfflineChecked ? "온라인" : "오프라인"}
      </button>
      <button
        onClick={handleTogglePersonalTeam}
        className={`btn flex items-center ${
          personalTeamChecked ? "text-blue-500" : "text-pink-800"
        }`}
      >
        {personalTeamChecked ? "팀" : "개인"}
      </button>
    </div>
  );
};

export default Filtering;
