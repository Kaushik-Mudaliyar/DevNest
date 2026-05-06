import { userModel } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { conf } from "../conf/conf.js";
export const authMiddleware = async function (req, res, next) {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized access");
    }

    const decodedToken = jwt.verify(token, conf.ACCESS_TOKEN_SECRET);
    const user = await userModel.findById(decodedToken._id).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(401, "Invalid token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized access");
  }
};
