import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getCurrentUser, getCurrentUserPosts } from "../controllers/user.controller.js";
const router = Router();

router.get("/me", authMiddleware, getCurrentUser);
router.get("/posts",authMiddleware,getCurrentUserPosts)
export default router;
