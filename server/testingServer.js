var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require(path.join(__dirname, "../database/index.js"));
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3004;
app.get("/articles/getFeatured", function(req, res) {
  console.log("reached ");
  db.getFeatured(function(err, article) {
    if (err) {
      res.statusCode(504);
    }
    res.json(article);
  });
});
app.get("/articles/getUser", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // req.query.id

  db.User.find({ id: req.query.id })
    .select("name")
    .then((name, err) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ name });
      }
    });
});
app.get("/articles/getCategory", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(res.header.toString(), "header");

  db.Category.find({ id: req.query.id })
    .select("name")
    .then((categ, err) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ categ });
        // console.log(err);
      }
    });
});

app.get("/articles/getCategory", (req, res) => {
  console.log("iam in category");
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.query.id);
  db.Category.find({ id: req.query.id })
    .select("name")
    .then((categ, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(categ.name);
      }
    });
});

app.get("/articles/get10Articals", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var AutherArray = req.query.id;
  var Category = [];
  var alldata = [];

  db.Article.find({ id: { $gte: 84781 } })
    .sort({ id: 1 })
    .limit(3)
    .then(data => {
      res.send({ data });
    });

  //res.sendFile(path.resolve(__dirname, 'client', 'build', 'bundle.js'));
});

app.post("/user/login", function(req, res) {
  console.log("rescieve post request");
  res.send("hello");
});
module.exports = app;
