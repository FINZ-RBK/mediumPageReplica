const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./database/index");

const app = express();
const port = process.env.PORT || 3004;

// require('./routes/reviewsRoutes.js')(app);
app.use(express.static("./node_modules"));
app.use(express.static("public"));
app.use(express.static("./client/node_modules"));
app.use(express.static("./src"));

app.get("/Topics", (req, res) => {
  db.getLatest(data => {
    res.send(data);
  });
  //res.sendFile(path.resolve(__dirname, 'client', 'build', 'bundle.js'));
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`connected to port ${port}`));
