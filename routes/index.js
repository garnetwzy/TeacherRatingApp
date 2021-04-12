var express = require("express");
var router = express.Router();
const MyDB = require("../db/MyDB");
var jwt = require("jsonwebtoken");
var config = require("../config/auth.config");
const { ObjectId } = require("mongodb");
var authJwt = require("../middlewares/authJwt");

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

router.post("/addteacher", [authJwt.verifyToken], async function (req, res, next) {
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

router.get("/teachers", [authJwt.verifyToken], async function (req, res, next) {
  const page = req.query.page || 0;
  console.log("debuging /teachers");
  delete req.query.page;
  console.log(req.query);
  let result = await MyDB.queryTeachers(page, req.query);
  res.json(result);
});

router.get("/teacher", [authJwt.verifyToken], async function (req, res, next) {
  const query = { _id: ObjectId(req.query.id) };
  let result = await MyDB.queryTeacher(query);
  console.log("end");
  res.json(result);
});

router.post("/updateteacher", async function (req, res, next) {
  console.log("here");
  console.log(req.body.title);
  console.log(req.body.id);
  console.log(req.body.grade);
  console.log(req.body.review);
  let data = {
    title: req.body.title,
    date: req.body.date,
    grade: parseFloat(req.body.grade),
    review: req.body.review,
  };
  console.log(data);
  let result = await MyDB.addComment(req.body.id, data);
  if (result) {
    res.json({ code: 200 });
  } else {
    res.json({ code: 500 });
  }
});

router.get("/currentuser", [authJwt.verifyToken], function(req, res, next){
  res.json({code: 200});
}) 

router.get("/logout", function(req, res, next) {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: false,
    maxAge: 0,
  });
  res.json({code: 200});
})

module.exports = router;
