const express = require("express");

const Post = require("../models/Posts");

const router = express.Router();

router.route("/users").get((req, res) => {
  Post.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/create").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;

  const newPost = new Post({
    name,
    email,
    age,
  });

  newPost
    .save()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
});

router.route("/edit/:_id").put((req, res) => {
  Post.findById({
    _id: req.params._id,
  })
    .then((post) => {
      post.name = req.body.name;
      post.email = req.body.email;
      post.age = req.body.age;
      post
        .save()
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/delete/:_id").delete((req, res) => {
  Post.findByIdAndDelete({
    _id: req.params._id,
  })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
