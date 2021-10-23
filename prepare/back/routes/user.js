const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User, Post } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET / user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// user 로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
  // POST / user / login
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
    // req.login을 하면 동시에 passport.serializeUser로 감.
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
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
  // POST /user/
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  // PATCH / user / nickname
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
