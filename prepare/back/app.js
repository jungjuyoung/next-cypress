const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("노드서버 구동");
});

server.listen(5000, () => {
  console.log(`server starting...`);
});
