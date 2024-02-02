import axios from "axios";

const apiBackEnd = axios.create({
  baseURL: "http://localhost:8000/api",
});
export default apiBackEnd;