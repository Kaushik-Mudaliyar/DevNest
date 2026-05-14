import jwt from "jsonwebtoken";
import {userModel} from "../models/user.model.js";

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await userModel.findById(decoded._id);

    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    next();
  }
};

export default optionalAuth;