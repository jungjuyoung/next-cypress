const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공...");
  })
  .catch(console.error);
passportConfig();

// app.use는 app(express서버에)에 무언갈 장착해서 사용할 때 사용하는데
// router에서 req.body를 사용할 수 있게 아래 use설정.
// express.json()과 express.urlencoded() 둘이 프론트에서 보낸 데이터를 해석해서 req.body 에 넣어줌
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true, // 쿠키 전달하고싶으면 true
  })
);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});
// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(5000, () => {
  console.log(`서버 실행중...`);
});
