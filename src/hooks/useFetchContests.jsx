import { useQuery } from "react-query";

export const useFetchContests = (page) => {
  return useQuery(
    ["videos", page],
    async () => {
      const res = await fetch(`http://127.0.0.1:8000/contests/?page=${page}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    {
      keepPreviousData: true, // 이전 데이터를 유지하여 페이지 이동 시 부드러운 사용자 경험 제공
    }
  );
};
