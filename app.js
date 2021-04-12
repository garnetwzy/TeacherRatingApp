var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "teacherrating-frontend/build")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use("/", indexRouter);

app.get("/*", (req, res) => {
  let val = path.resolve("teacherrating-frontend", "build", "index.html");
  console.log("ddd");
  console.log(val);
  res.sendFile(path.resolve("teacherrating-frontend", "build", "index.html"));
});
module.exports = app;
