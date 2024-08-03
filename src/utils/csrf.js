import axios from "axios";

// CSRF 토큰을 가져오는 함수
export async function getCsrfToken() {
  const response = await axios.get(
    "http://127.0.0.1:8000/users/get-csrf-token/"
  );
  return response.data.csrfToken;
}

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(async (config) => {
  const csrfToken = await getCsrfToken();
  config.headers["X-CSRFToken"] = csrfToken;
  return config;
});

export default axiosInstance;
