import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {
    const reponse = await axiosInstance.post("/auth/signup", signupData);
    return reponse.data;
};

export const login = async (loginData) => {
    const reponse = await axiosInstance.post("/auth/login", loginData);
    return reponse.data;
};

export const logout = async () => {
    const reponse = await axiosInstance.post("/auth/logout");
    return reponse.data;
}; 

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
    } catch (error) {
        console.log("Erreur dans la fonction getAuthUser", error);
        return null;
    }
}; 
export const completeOnboarding = async (userData) => {
    const response = await axiosInstance.post("/auth/onboarding", userData);
    return response.data;
};

export const getDjavoues = async () => {
    const response = await axiosInstance.get("/users/djavoues");
    return response.data;
};

export const getRecommendedUsers = async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
};

export const getOutgoingDjavoueReqs =  async () => {
    const reponse = await axiosInstance.get("/users/outgoing-djavoue-requests");
    return reponse.data
};

export const sendDjavoueRequest = async (userId) => {
    const reponse = await axiosInstance.post(`/users/djavoue-request/${userId}`);
    return reponse.data
};

export const getDjavoueRequests = async () => {
    const reponse = await axiosInstance.get("/users/djavoue-requests");
    return reponse.data
};

export const acceptDjavoueRequest = async (requestId) => {
    const reponse = await axiosInstance.put(`/users/djavoue-request/${requestId}/accept`);
    return reponse.data
};  

export const getFlewaToken = async () => {
    const reponse = await axiosInstance.get("/chat/token");
    return reponse.data
}