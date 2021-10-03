const express = require("express");
const postRouter = require("./routes/post");
const db = require("./models");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공...");
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("hello express...");
});

app.get("/api", (req, res) => {
  res.send("hello api....");
});

app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

app.use("/post", postRouter);

app.listen(5000, () => {
  console.log(`server starting...`);
});
