import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PictureDetail() {
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/contests/${id}`
        ); // id 값을 이용하여 서버로 요청
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);
  if (!video) {
    return <div>Loading...</div>;
  }
  // 받은 상태 정보 사용하기
  return (
    <div>
      <h1>Picture Detail</h1>
      <p>Video: {video.제목}</p>
      {/* 이하 내용 추가 */}
    </div>
  );
}

export default PictureDetail;
