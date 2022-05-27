const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = mongoose.Schema({
  body: { type: String, minLength: 2, maxLength: 255, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  likes: { type: Array, default: [] },
  dislikes: { type: Array, default: [] },
  dateAdded: { type: Date, default: Date.now() },
  spotId: { type: String, default: "" },
  spotPost: { type: String, default: "" },
  time: { type: String, default: "" },
});

const validatePost = (post) => {
  const schema = Joi.object({
    body: Joi.string().min(2).max(255).required(),
    userId: Joi.string().required(),
    name: Joi.string().required(),
    spotId: Joi.string(),
    spotPost: Joi.string(),
    time: Joi.string(),
  });
  return schema.validate(post);
};

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
module.exports.Post = Post;
module.exports.postSchema = postSchema;
module.exports.validatePost = validatePost;
