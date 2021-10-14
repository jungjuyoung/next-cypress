const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post } = require("../models");
const router = express.Router();
const passport = require("passport");

// user 로그인
router.post("/login", (req, res, next) => {
  // POST / user / login
  // console.log(`@@ routes user login req.body: ${JSON.stringify(req.body)}`);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // 서버에러 500
      console.log(err);
      return next(err);
    }
    if (info) {
      // 클라이언트 에러
      return res.status(401).send(info.reason);
    }
    // 성공하면 user에 사용자 정보객체를 가지고
    // passport의 req.login으로 로그인함
    // req에서 login을 사용할 수 있게 passport가 제공해줌
    return req.login(user, async loginErr => {
      // 여기는 우리서비스의 에러가 아니고, passport로그인의 에러임
      if (loginErr) {
        console.log(loginErr);
        return next(loginErr);
      }
      // passport의 req.login할때 내부적으로 쿠키를 만들어서
      // res.setHeader('Cookie','cxlhy)를 프론트에(쿠키) 내려주고 알아서 세션이랑 연결
      // 서버쪽에서 통째로 들고있는건 세션
      // passport는 세션에 많은 정보를 들고있는 유저를 통째로 들고있으면
      // 메모리가 버티지 못하기때문에 쿠키에 user의 id만 쿠키와 매칭시켜서 보관
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/", async (req, res, next) => {
  // POST / user
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

router.post("/user/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  req.send("ok");
});

module.exports = router;
