const express = require("express");
const multer = require("multer");
const csurf = require("csurf");

const csrfProtection =
  process.env.USE_TOKEN === "true"
    ? csurf({ cookie: true })
    : (_, __, next) => {
        next();
      };

const authRouter = express.Router();
authRouter.get("/", (req, res, next) => {
  res.cookie("userId", "这是一个测试用的 userID", {
    expires: new Date(Date.now() + 900000),
  });
  res.end("ok");
});

const transferRouter = express.Router();

const formData = multer();
transferRouter.post("/", formData.any(), csrfProtection, (req, res, next) => {
  const { body } = req;
  const { userId } = req.cookies;
  if (userId) {
    res.send({
      status: "transfer success",
      amount: body.amount,
      to: body.to,
    });
  } else {
    res.send({
      status: "error",
      transfer: null,
    });
  }
});

const csrfTokenRouter = express.Router();
csrfTokenRouter.get("/", csrfProtection, (req, res) => {
  const csrfToken = req.csrfToken();
  res.set("X-CSRF-Token", csrfToken);
  res.send("CSRF Token sent");
});

module.exports = {
  authRouter,
  transferRouter,
  csrfTokenRouter,
};
