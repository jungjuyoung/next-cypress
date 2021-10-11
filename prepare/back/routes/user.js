const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const router = express.Router();
const passport = require("passport");

// user 로그인
router.post("/login", (req, res, next) => {
  // POST / user / login
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // 서버에러 500
      console.log(err);
      return next(err);
    }
    if (info) {
      // 클라이언트 에러 400
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
      return res.status(200).json(user);
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

module.exports = router;
