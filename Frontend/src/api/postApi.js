import api from "./axios.js";

export const getAllPosts = (search = "") =>
  api.get(`/post/all-posts?search=${search}`);

export const getPostById = (postId) => api.get(`/post/${postId}`);

export const createPost = (formData) => api.post("/post/create-post", formData);

export const updatePost = (postId, formData) =>
  api.patch(`/post/${postId}`, formData);

export const deletePost = (postId) => api.delete(`/post/${postId}`);
