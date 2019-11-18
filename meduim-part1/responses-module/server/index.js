const express = require("express");
const bodyParser = require("body-parser");
const SSE = require("express-sse");
const path = require("path");
const db = require("../database-mongo/index");

const port = process.env.PORT || 3003;
const app = express();

app.use(express.static(path.join(`${__dirname}/../public`)));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
const sse = new SSE();
const articleModel = db.Article;
const userModel = db.User;

// open channel at /stream so we can send from server to client through this channel
app.get("/stream", sse.init);

// selectAll the Articles and then the comments in the article
app.get("/responses/:id", (req, res) => {
    const { id } = req.params;
    db.selectAll(articleModel, id, (err, result) => {
        if (err) {
            throw err;
        } else {
            const comments = result[0].comments;
            sse.send(comments);
            //console.log("hi from the server ",comments)
            res.status(204).send();
        }
    });
});
app.get("*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../public`));
});
app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});