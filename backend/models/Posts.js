const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const postSchema = new Schema({
  name: { type: String },
  email: { type: String },
  age: { type: Number },
});

const Post = Mongoose.model("Post", postSchema);

module.exports = Post;
