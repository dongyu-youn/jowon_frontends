import React from "react";
import { Radar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Chart.js 최신 버전을 사용하기 위해 auto import

const data = {
  labels: ["성실도", "경험", "성과"],
  datasets: [
    {
      label: "내 데이터",
      data: [80, 70, 90], // 각 항목의 값 (예: 성실도, 경험, 성과)
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "평균 데이터",
      data: [70, 80, 85], // 각 항목의 값 (평균 데이터)
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

const options = {
  scales: {
    r: {
      angleLines: {
        display: true,
      },
      pointLabels: {
        display: true,
      },
      ticks: {
        beginAtZero: true,
      },
    },
  },
};

const RadarChart = () => (
  <div style={{ height: "400px", width: "400px" }}>
    <Radar data={data} options={options} />
  </div>
);

export default RadarChart;
