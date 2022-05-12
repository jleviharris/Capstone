const { Post, validatePost } = require("../models/post");
// const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

// POST a Post
// http://localhost:3007/api/post
router.post("/", async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error);
    let newPost = await new Post(req.body);
    await newPost.save();
    return res.status(201).send(newPost);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// Get all posts
// http://localhost:3007/api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) return res.status(400).send(`No posts to show!`);
    return res.send(posts);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// Get all posts from single user
// http://localhost:3007/api/posts/:userId
router.get("/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    if (!posts) return res.status(400).send(`No posts to show!`);
    return res.send(posts);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});



// PUT an existing post
// http://localhost:3007/api/posts/:postId
router.put("/:postId", async (req, res) => {
  try {
    const post = await Post.UpdateOne({ _id: req.params.postId }, req.body);
    if (!post) return res.status(400).send(`No post to show!`);
    return res.send(post);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// PUT an existing post add like
// http://localhost:3007/api/posts/like/:postId
router.put("/like/:postId", async (req, res) => {
  try {
    const post = await Post.updateOne(
      { _id: req.params.postId },
      { $addToSet: { likes: req.body.likes } },
      { new: true }
    );
    if (!post) return res.status(400).send(`No likes to show!`);
    return res.send(post.likes);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// PUT an existing post remove likes
// http://localhost:3007/api/posts/like/:postId
router.put("/like/remove/:postId", async (req, res) => {
  try {
    const post = await Post.updateOne(
      { _id: req.params.postId },
      { $pull: { likes: req.body.likes } },
      { new: true }
    );
    if (!post) return res.status(400).send(`No likes to show!`);
    return res.send(post.likes);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// PUT an existing post add dislikes
// http://localhost:3007/api/posts/dislike/:postId
router.put("/dislike/:postId", async (req, res) => {
  try {
    const post = await Post.updateOne(
      { _id: req.params.postId },
      { $addToSet: { dislikes: req.body.dislikes } },
      { new: true }
    );
    if (!post) return res.status(400).send(`No dislikes to show!`);
    return res.send(post.dislikes);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// PUT an existing post remove dislikes
// http://localhost:3007/api/posts/dislike/:postId
router.put("/dislike/remove/:postId", async (req, res) => {
  try {
    const post = await Post.updateOne(
      { _id: req.params.postId },
      { $pull: { dislikes: req.body.dislikes } },
      { new: true }
    );
    if (!post) return res.status(400).send(`No dislikes to show!`);
    return res.send(post.dislikes);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// DELETE a single post from the database
// http://localhost:3007/api/:postId
router.delete("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post)
      return res
        .status(400)
        .send(`Post with id ${req.params.postId} does not exist!`);
    await post.remove();
    return res.send(post);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
