const express = require("express");
const bodyParser = require("body-parser");
const dbArticle = require("./database/index").Article;
const db = require("./database/index");

const app = express();
const port = process.env.PORT || 3004;

// require('./routes/reviewsRoutes.js')(app);
app.use(express.static("./node_modules"));
app.use(express.static("public"));
app.use(express.static("./client/node_modules"));
app.use(express.static("./src"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/getUser", (req, res) => {
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

app.get("/getCategory", (req, res) => {
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
app.get("/get10Articals", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.query);
  console.log("hi");
  var AutherArray = req.query.id;
  var Category = [];
  var alldata = [];

  dbArticle
    .find({ id: { $gte: req.query.id } })
    .sort({ id: 1 })
    .limit(3)
    .then(data => {
      // console.log(data);
      res.send(data);
    });

  //res.sendFile(path.resolve(__dirname, 'client', 'build', 'bundle.js'));
});

app.listen(port, () => console.log(`connected to port ${port}`));
