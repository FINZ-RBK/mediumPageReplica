var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require(path.join(__dirname, "../database/index.js"));
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3004;
app.get("/articles/getFeatured", function (req, res) {
    console.log('reached ')
    db.getFeatured(function (err, article) {
        if (err) {
            res.statusCode(504);
        }
        console.log(article);
        res.json(article);
    });

})
app.listen(port, () => { console.log('connected on port' + port) });