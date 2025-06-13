import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4010/api/",
    withCredentials: true // Envoie des cookies avec la requête
});