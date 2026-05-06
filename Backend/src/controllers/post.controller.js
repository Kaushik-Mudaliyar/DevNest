import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
import { postModel } from "../models/post.model.js";
import { isValidObjectId } from "mongoose";
const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content is required");
  }

  const imagepath = req.file?.path;

  if (!imagepath) {
    return res.status(400).json(new ApiError(400, "Image not found"));
  }
  const response = await uploadOnCloudinary(imagepath);

  if (!response) {
    throw new ApiError(500, "Failed to upload image");
  }

  const post = await postModel.create({
    title,
    content,
    image: response.secure_url,
    author: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});
const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const imagePath = req.file?.path;

  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid postId");
  }

  if (!title && !content && !imagePath) {
    throw new ApiError(400, "At least one field is required to update post");
  }

  const post = await postModel.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post does not exist");
  }
  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this post");
  }

  const postUpdate = {};
  if (title) postUpdate.title = title;
  if (content) postUpdate.content = content;
  if (imagePath) {
    const uploadedImage = await uploadOnCloudinary(imagePath);
    postUpdate.image = uploadedImage.secure_url;
    const oldPostImage = post.image;
    const url = new URL(oldPostImage);
    const path = url.pathname;
    const publicIdWithExtension = path.split("/").pop();

    const public_id = publicIdWithExtension.split(".")[0];

    const deletedResponse = await deleteOnCloudinary(public_id, "image");
    if (deletedResponse?.result === "ok") {
      console.log("Old thumbnail file deleted successfully");
    }
  }

  const updatedPost = await postModel.findByIdAndUpdate(postId, postUpdate, {
    returnDocument: "after",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post Updated successfully"));
});
const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid post Id");
  }

  const post = await postModel.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Unauthorized access");
  }

  await post.deleteOne();

  const oldPostImage = post.image;
  const url = new URL(oldPostImage);
  const path = url.pathname;
  const publicIdWithExtension = path.split("/").pop();

  const public_id = publicIdWithExtension.split(".")[0];
  const deletedResponse = await deleteOnCloudinary(public_id, "image");
  if (deletedResponse?.result === "ok") {
    console.log("Old thumbnail file deleted successfully");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post Deleted successfully"));
});
const getAllPosts = asyncHandler(async (req, res) => {
  const { search } = req.query;

  let filter = {};

  if (search) {
    filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ],
    };
  }

  const posts = await postModel
    .find(filter)
    .populate("author", "username email")
    .sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, posts, "All posts fetched successfully"));
});
const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid post Id");
  }

  const post = await postModel
    .findById(postId)
    .populate("author", "username email");
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});

export { createPost, updatePost, deletePost, getAllPosts, getPostById };
