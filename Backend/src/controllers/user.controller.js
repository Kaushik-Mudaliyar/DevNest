import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { postModel } from "../models/post.model.js";
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetched successfully"));
});

const getCurrentUserPosts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const posts = await postModel
    .find({ author: userId })
    .sort({ createdAt: -1 })
    .populate("author", "username email");

  return res
    .status(200)
    .json(
      new ApiResponse(200, posts, "Current user post fetched successfully"),
    );
});

export { getCurrentUser, getCurrentUserPosts };
