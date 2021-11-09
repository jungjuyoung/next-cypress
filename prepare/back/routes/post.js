const express = require("express");
const multer = require("multer"); // multipart 처리를 위한
const path = require("path");
const fs = require("fs");

const { Post, User, Comment, Image, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없어서 강제로 생성했습니다.");
  fs.mkdirSync("uploads");
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // 이미지.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); //이미지
      done(null, basename + "_" + new Date().getTime() + ext); // 이미지2110231113.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  // POST / post
  // console.log(`@@ post routers req.body: ${JSON.stringify(req.body)}`);
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    // 저장
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } })
        )
      ); // [[인생, true], [꽃길,true]]
      await post.addHashtags(result.map(v => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지를 여러개 올리면 imgae: [abc.png, zxc.png]
        const images = await Promise.all(
          req.body.image.map(img => Image.create({ src: img }))
        );
        await post.addImages(images);
      } else {
        // 이미지를 하나만 올리면 image: 이미지.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    // 방금 생성한 게시글 가져오기
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    console.log(`router post: ${fullPost}`);
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 이미지 업로드
router.post(
  "/images",
  isLoggedIn,
  upload.array("image"),
  async (req, res, next) => {
    // POST / post / images
    try {
      console.log(req.files);
      res.json(req.files.map(v => v.filename));
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get("/:postId", async (req, res, next) => {
  // GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send("존재하지 않는 게시글입니다.");
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/retweet", isLoggedIn, async (req, res, next) => {
  // POST / post /1/ retweet
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
      include: [
        {
          model: Post,
          as: "Retweet",
        },
      ],
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    // === 자기 게시글 리트윗, 자기 게시글을 남이 리트윗 한 게시글에 자기가 다시 리트윗 막기
    if (
      req.user.id === post.UserId || // 자기 게시글 리트윗,
      (post.Retweet && post.Retweet.UserId === req.user.id) // 자기 게시글을 남이 리트윗 한 글을 자기가 다시 리트윗
    ) {
      return res.status(403).send("자신의 글은 리트윗할 수 없습니다.");
    }
    // === 자기 게시글 리트윗, 자기 게시글을 남이 리트윗 한 게시글에 자기가 다시 리트윗 막기

    // 다른 게시글을 리트윗한 게시글을 다시 리트윗
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send("이미 리트윗 했습니다.");
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: "retweet",
    });

    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });
    res.status(201).json(retweetWithPrevPost);
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
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  // PATCH / post / 1 / like
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글 입니다.");
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  // DELETE / post / 1 / like
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글 입니다.");
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:postId", isLoggedIn, async (req, res, next) => {
  // PATCH / post / 1
  const hashtags = req.body.content.match(/#[^\s#]+/g);

  try {
    await Post.update(
      {
        content: req.body.content,
      },
      {
        where: { id: req.params.postId },
        UserId: req.user.id, // 내가쓴 게시글일때 삭제
      }
    );
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } })
        )
      ); // [[인생, true], [꽃길,true]]
      await post.setHashtags(result.map(v => v[0]));
    }
    res.status(200).json({
      PostId: parseInt(req.params.postId, 10),
      content: req.body.content,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  // DELETE / post / 1
  try {
    await Post.destroy({
      where: { id: req.params.postId },
      UserId: req.user.id, // 내가쓴 게시글일때 삭제
    });
    // console.log(`@@ req.params.postId type: ${typeof req.params.postId}`);
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
