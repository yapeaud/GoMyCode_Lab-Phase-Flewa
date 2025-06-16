import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4010/api/" : "/api";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // Envoie des cookies avec la requête
});