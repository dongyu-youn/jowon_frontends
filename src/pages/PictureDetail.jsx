import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";

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
    <>
      <section className="flex flex-col md:flex-row p-4 items-center justify-center">
        <img src={video.사진} className="w-1/6 px-20 basis-7/12" />

        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-4xl font-bold py-2 mb-12 font-dongle_semibolde">
            이름 : {video.제목}
          </h2>
          <p className="text-2xl font-bold py-2  mb-4 font-dongle">
            연관학과 : {video.연관학과}
          </p>
          <p className="text-2xl font-bold py-2 mb-8 font-dongle">
            상금: {video.상금}
          </p>

          <p className="py-4 text-2xl  border-b border-gray-400 mb-12 font-dongle_light">
            학년: {video.학년}
          </p>
          <p className=" flex items-center justify-center py-4 text-2xl  border-b border-gray-400 mb-12 font-dongle_light">
            분야: {video.분야}
          </p>
          <p className=" flex items-center justify-center py-4 text-2xl  border-b border-gray-400 mb-12 font-dongle_light">
            위치: {video.위치}
          </p>
          <p className=" flex items-center justify-center py-4 text-2xl  border-b border-gray-400 mb-12 font-dongle_light">
            참고링크: {video.참고링크}
          </p>

          <Button className="mt-20" text="제의하기"></Button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default PictureDetail;
