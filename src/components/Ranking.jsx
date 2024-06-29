import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Rank = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/contests/48/applicants/"
        );
        setUsers(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  // 상위 10명의 사용자만 무작위로 가져옴
  const shuffledUsers = users.sort(() => 0.5 - Math.random()).slice(0, 7);

  // 각 사용자에게 수동으로 점수를 할당
  const usersWithPoints = shuffledUsers.map((user, index) => ({
    ...user,
    points: 100 - index * 10, // 점수 할당 예시: 100, 90, 80, ..., 40
  }));

  const getRankColor = (index) => {
    if (index === 0) return "bg-yellow-400"; // 금
    if (index === 1) return "bg-gray-400"; // 은
    if (index === 2) return "bg-yellow-800"; // 동
    return "bg-white"; // 기본값
  };

  return (
    <div className="ranking-page p-8">
      <h1 className="text-4xl font-bold mb-8 text-center mt-40">Top 7 Users</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {usersWithPoints.map((user, index) => (
          <div
            key={user.id}
            className="ranking-card p-6 border rounded-lg shadow-md bg-white text-black relative"
          >
            {/* 랭크 효과 */}
            <div
              className={`absolute top-0 left-0 w-10 h-10 ${getRankColor(
                index
              )} text-white flex items-center justify-center rounded-br-lg`}
            >
              {index + 1}
            </div>
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={`${user.이름}'s avatar`}
                className="w-16 h-16 rounded-full mr-4 border-2 border-gray-300"
              />
              <div className="flex justify-center flex-col ml-20">
                <h2 className="text-2xl font-bold">{index + 1}위</h2>
                <p className="text-lg">{user.이름}</p>
                <p className="text-sm">{user.학번}</p>
                <p className="text-sm">{user.학과}</p>
                <p className="text-sm">Points: {user.points}점</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rank;
