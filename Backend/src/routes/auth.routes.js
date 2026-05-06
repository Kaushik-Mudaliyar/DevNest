import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  userRegisterValidator,
  loginUserValidator,
} from "../validators/index.js";

const router = Router();

router.post("/register", userRegisterValidator(), validate, registerUser);
router.post("/login", loginUserValidator(), validate, loginUser);

// secure routes
router.post("/logout", authMiddleware, logoutUser);

export default router;
