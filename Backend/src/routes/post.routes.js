import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  searchPosts,
  toggleLikePost,
  updatePost,
} from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import optionalAuth from "../middleware/optionalAuth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.get("/all-posts", getAllPosts);
// secure routes
router.post("/create-post", authMiddleware, upload.single("image"), createPost);
router.get("/:postId", optionalAuth, getPostById);
router.patch("/:postId", authMiddleware, upload.single("image"), updatePost);
router.patch("/:postId/like", authMiddleware, toggleLikePost);
router.delete("/:postId", authMiddleware, deletePost);
router.get("/search",authMiddleware,searchPosts)

export default router;
