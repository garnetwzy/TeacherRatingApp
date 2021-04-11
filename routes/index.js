var express = require("express");
var router = express.Router();
const MyDB = require("../db/MyDB");
var jwt = require("jsonwebtoken");
var config = require("../config/auth.config");
const { ObjectId } = require("mongodb");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", async function (req, res, next) {
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
    res.json({ code: 200, token: token });
  } else {
    res.json({
      code: 550,
      error: "no such user.",
    });
  }
});

router.post("/addteacher", async function (req, res, next) {
  let queryResult = await MyDB.queryTeacher({
    name: req.body.name,
    university: req.body.university,
    field: req.body.field,
  });
  if (queryResult) {
    res.json({ code: 400, message: "This user is already been added." });
  } else {
    let teacher = {
      name: req.body.name,
      university: req.body.university,
      field: req.body.field,
      sumScores: 0,
      comments: [],
      commentCount: 0,
    };
    let result = await MyDB.storeTeacher(teacher);
    if (result) {
      res.json({ code: 200 });
    } else {
      res.json({ code: 500 });
    }
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
  res.json({ code: 200 });
});

const nPerPage = 6;

router.get("/teachers", async function (req, res, next) {
  const query = req.query.query || "";
  const page = +req.query.page || 0;
  let result = await MyDB.queryTeachers(page);
  res.json(result);
  // Here pagination is implemented in Javascript

  // You actually want to implement it in Mongo
  // something like
  //
  // movies
  //   .find({title: {$regex: query}})
  //   .sort({ _id: 1 })
  //   .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
  //   .limit(nPerPage);
});

router.get("/teacher", async function (req, res, next) {
  console.log("/teacher");
  let result = await MyDB.queryTeacher(req.query);

  if (result === null) {
    res.json({
      code: 200,
      found: false,
    });
  } else {
    res.json({
      code: 200,
      found: true,
      teacher: result,
    });
  }
});

module.exports = router;
