// utils/axiosInstance.js

import axios from "axios";
import Cookies from "js-cookie";

const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/users/get-csrf-token/",
      {
        withCredentials: true,
      }
    );
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return "";
  }
};

const getAxiosInstance = async () => {
  const userToken = Cookies.get("csrftoken") || (await fetchCsrfToken());
  const accessToken = localStorage.getItem("access_token") || "";

  console.log("CSRF Token:", userToken);
  console.log("Access Token:", accessToken);

  return axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
    },
  });
};

export default getAxiosInstance;
