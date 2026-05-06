import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.get("/all-posts", getAllPosts);
router.get("/:postId", getPostById);
// secure routes
router.post("/create-post", authMiddleware, upload.single("image"), createPost);
router.patch("/:postId", authMiddleware, upload.single("image"), updatePost);
router.delete("/:postId", authMiddleware, deletePost);

export default router;
