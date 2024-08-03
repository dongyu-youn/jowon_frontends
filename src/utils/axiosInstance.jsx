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

const getToken = async (username, password) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/users/api-token-auth/",
      {
        username,
        password,
      }
    );
    console.log("Auth Token:", response.data.token);
    return response.data.token;
  } catch (error) {
    console.error("Error fetching auth token:", error);
    return "";
  }
};

const getAxiosInstance = async (username, password) => {
  const userToken = Cookies.get("csrftoken") || (await fetchCsrfToken());
  let accessToken = localStorage.getItem("access_token");

  if (!accessToken && username && password) {
    accessToken = await getToken(username, password);
    localStorage.setItem("access_token", accessToken);
  }

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
