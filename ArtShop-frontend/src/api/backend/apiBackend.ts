import axios, { AxiosInstance } from "axios";

const apiBackEnd: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});
export default apiBackEnd;
