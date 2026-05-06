import api from "./axios.js";

export const getCurrentUser = () => api.get("/user/me");

export const getCurrentUserPosts = () => api.get("/user/posts");
