const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공...");
  })
  .catch(console.error);

// app.use는 app(express서버에)에 무언갈 장착해서 사용할 때 사용하는데
// router에서 req.body를 사용할 수 있게 아래 use설정.
// express.json()과 express.urlencoded() 둘이 프론트에서 보낸 데이터를 해석해서 req.body 에 넣어줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello express...");
});

app.get("/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(5000, () => {
  console.log(`server starting...`);
});
