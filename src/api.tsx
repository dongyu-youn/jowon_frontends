import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);
