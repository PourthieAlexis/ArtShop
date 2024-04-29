import axios, { AxiosInstance } from "axios";
//Instance d'axios, responsable pour la gestion de l'api et ses routes
const apiBackEnd: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});
export default apiBackEnd;
