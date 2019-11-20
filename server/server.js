var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require(path.join(__dirname, "../database/index.js"));
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3004;
app.get("/articles/getFeatured", function(req, res) {
  db.getFeatured(function(err, article) {
    if (err) {
      res.statusCode(504);
    }
    console.log(article);
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
        res.send(name[0].name);
      }
    });
});

app.get("/articles/getCategory", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  db.Category.find({ id: req.query.id })
    .select("name")
    .then((categ, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(categ[0].name);
        var data = categ[0].name;
        res.send(data);
      }
    });
});
app.get("/articles/get10Articals", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var AutherArray = req.query.id;
  var Category = [];
  var alldata = [];

  db.Article.find({ id: { $gte: req.query.id } })
    .sort({ id: 1 })
    .limit(3)
    .then(data => {
      res.send(data);
    });
});
app.listen(port, () => {
  console.log("connected on port" + port);
});
