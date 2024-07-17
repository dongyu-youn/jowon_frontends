import axios from "axios";
import Cookies from "js-cookie";

export const fetchFilteredContests = async (filter) => {
  const userToken = Cookies.get("csrftoken") || "";
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });

  const response = await axiosInstance.get(
    `http://127.0.0.1:8000/contests/filtered-contests/?${filter}=true`
  );
  return response.data;
};
