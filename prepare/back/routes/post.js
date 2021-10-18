const express = require("express");
const router = express.Router();
const { Post, User, Comment, Image } = require("../models");
const { isLoggedIn } = require("./middlewares");

router.post("/", isLoggedIn, async (req, res, next) => {
  // POST / post
  // console.log(`@@ post routers req.body: ${JSON.stringify(req.body)}`);
  try {
    // 저장
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    // 방금 생성한 게시글 가져오기
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  // POST / post /1/ comment
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/", (req, res) => {
  //DELETE / post
  res.json({ id: 1, content: "hello" });
});

module.exports = router;
