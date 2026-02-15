

// import Post from "../models/Post.js";
// import path from "path";

// // 📸 Create Post
// export const createPost = async (req, res) => {
//   try {
//     const { caption } = req.body;
//     const image = req.file ? req.file.filename : null;

//     if (!image) return res.status(400).json({ message: "Image is required" });

//     const post = new Post({
//       userId: req.userId,
//       caption,
//       image
//     });

//     await post.save();
//     res.status(201).json({ message: "Post created successfully", post });
//   } catch (err) {
//     res.status(500).json({ message: "Error creating post", error: err.message });
//   }
// };

// // 🧾 Get All Posts
// export const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate("userId", "name email")
//       .populate("comments.userId", "name")
//       .sort({ createdAt: -1 });
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching posts" });
//   }
// };

// // ❤️ Like/Unlike Post
// export const toggleLike = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post not found" });

//     const userId = req.userId;
//     const liked = post.likes.includes(userId);

//     if (liked) {
//       post.likes = post.likes.filter(id => id.toString() !== userId.toString());
//     } else {
//       post.likes.push(userId);
//     }

//     await post.save();
//     res.json({ liked: !liked, likesCount: post.likes.length });
//   } catch (err) {
//     res.status(500).json({ message: "Error liking/unliking post" });
//   }
// };

// // 💬 Comment on Post
// export const addComment = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post not found" });

//     const comment = { userId: req.userId, text };
//     post.comments.push(comment);
//     await post.save();

//     res.json({ message: "Comment added", post });
//   } catch (err) {
//     res.status(500).json({ message: "Error adding comment" });
//   }
// };

import Post from "../models/Post.js";
import path from "path";

// 📸 Create Post
export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) return res.status(400).json({ message: "Image is required" });

    const post = new Post({
      userId: req.user._id,   // ✅ fixed here
      caption,
      image
    });

    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    console.error("❌ Error in createPost:", err);
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
};

// 🧾 Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name email")
      .populate("comments.userId", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("❌ Error in getAllPosts:", err);
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
};

// ❤️ Like/Unlike Post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id; // ✅ fixed here
    const liked = post.likes.includes(userId);

    if (liked) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ liked: !liked, likesCount: post.likes.length });
  } catch (err) {
    console.error("❌ Error in toggleLike:", err);
    res.status(500).json({ message: "Error liking/unliking post", error: err.message });
  }
};

// 💬 Comment on Post
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = { userId: req.user._id, text }; // ✅ fixed here
    post.comments.push(comment);
    await post.save();

    res.json({ message: "Comment added", post });
  } catch (err) {
    console.error("❌ Error in addComment:", err);
    res.status(500).json({ message: "Error adding comment", error: err.message });
  }
};

// ✏️ Update Post
// export const updatePost = async (req, res) => {
//   try {
//     const { caption } = req.body;
//     const image = req.file ? req.file.filename : null;

//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post not found" });

//     // Check if user owns the post
//     if (post.userId.toString() !== req.userId)
//       return res.status(403).json({ message: "Not authorized to edit this post" });

//     post.caption = caption || post.caption;
//     if (image) post.image = image;

//     await post.save();
//     res.json({ message: "Post updated successfully", post });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating post", error: err.message });
//   }
// };

// ✏️ Update Post
export const updatePost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file ? req.file.filename : null;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // ✅ Fix: use req.user._id for consistency
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this post" });
    }

    post.caption = caption || post.caption;
    if (image) post.image = image;

    await post.save();
    res.json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err.message });
  }
};


// // 🗑️ Delete Post
// export const deletePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post not found" });

//     if (post.userId.toString() !== req.userId)
//       return res.status(403).json({ message: "Not authorized to delete this post" });

//     await post.deleteOne();
//     res.json({ message: "Post deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting post", error: err.message });
//   }
// };

// 🗑️ Delete Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // ✅ Fix: use req.user._id for consistency
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err.message });
  }
};
