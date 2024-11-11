process.env.USE_TOKEN = "true";

const express = require("express");
const { authRouter, transferRouter, csrfTokenRouter } = require("./router");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static(path.join(__dirname, "html")));
app.use(cookieParser());
app.use(express.urlencoded());
app.use("/auth", authRouter);
app.use("/transfer", transferRouter);
app.use("/token", csrfTokenRouter);

app.listen(3000, () => {
  console.log("服务器启动");
  console.log("http://localhost:3000");
});
