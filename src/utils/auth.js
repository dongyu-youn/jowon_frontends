// auth.js

import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/token/", {
      username,
      password,
    });
    const { access, refresh } = response.data;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    return response.data;
  } catch (error) {
    console.error("Error during login", error);
    throw error;
  }
};
