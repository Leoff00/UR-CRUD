const express = require("express");
const Post = require("../models/Posts");

const router = express.Router();

router.route("/users").get(async (req, res) => {
  const foundPosts = await Post.find();
  res.json(foundPosts);
});

router.route("/create").post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;

  const newPost = new Post({
    name,
    email,
    age,
  });

  await newPost.save();
});

router.route("/edit/:_id").put((req, res) => {
  Post.findById({
    _id: req.params._id,
  })
    .then((post) => {
      post.name = req.body.name;
      post.email = req.body.email;
      post.age = req.body.age;

      post.save();
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/delete/:_id").delete(async (req, res) => {
  const deleteUser = await Post.findByIdAndDelete({
    _id: req.params._id,
  });

  deleteUser;
});

module.exports = router;
