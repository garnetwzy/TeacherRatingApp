var express = require("express");
var router = express.Router();
const MyDB = require("../db/MyDB");
var jwt = require("jsonwebtoken");
var config = require("../config/auth.config");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", async function (req, res, next) {
  console.log("ddd");
  console.log(req.body.email);
  console.log(req.body.password);
  let result = await MyDB.queryUser({
    email: req.body.email,
    password: req.body.password,
  });
  if (result) {
    console.log("private");
    console.log(config.secret);
    var token = jwt.sign({ id: req.body.email }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });
    res.json({ code: 200, token: token});
  } else {
    res.json({
      code: 550,
      error: "no such user.",
    });
  }
});

router.post("/signup", async function (req, res, next) {
  let result = await MyDB.queryUser({ email: req.body.email });
  if (result) {
    res.json({ code: 550, error: "user already exists." });
  } else {
    result = await MyDB.storeUser({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
  }
  res.json({ code: 200});
});

module.exports = router;
