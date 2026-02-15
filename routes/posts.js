import express from "express";
import upload from "../middleware/multer.js";
import { protect } from "../middleware/auth.js"; // ✅ use same as your auth.js
import {
  createPost,
  getAllPosts,
  toggleLike,
  addComment,
   updatePost,
  deletePost
} from "../controllers/postController.js";

const router = express.Router();

// Create post (only logged-in users)
router.post("/create", protect, upload.single("image"), createPost);

// Get all posts
router.get("/all", protect, getAllPosts);

// // Like / Unlike a post
// router.put("/:id/like", protect, toggleLike);

// // Add a comment to a post
// router.post("/:id/comment", protect, addComment);

// ❤️ Like / Unlike a post  👉 changed route to match frontend
router.put("/like/:id", protect, toggleLike);

// 💬 Add comment to a post  👉 changed route to match frontend
router.post("/comment/:id", protect, addComment);

// 🆕 New ones:
router.put("/update/:id", protect, upload.single("image"), updatePost);
router.delete("/delete/:id", protect, deletePost);




export default router;
