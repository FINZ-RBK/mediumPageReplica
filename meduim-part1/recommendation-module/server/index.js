const express = require("express");
const bodyParser = require("body-parser");
const SSE = require("express-sse");
const path = require("path");
const db = require("../database-mongo/index");

const port = process.env.PORT || 3004;

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

//get the data from the db (here, it gets all the users and the articles by putting them into one object.)
app.get("/recommendations/:id", (req, res) => {
    const allData = {};
    db.selectAll(userModel, (err, users) => {
        if (err) {
            throw err;
        } else {
            allData["users"] = users;
            db.selectAll(articleModel, (err, arts) => {
                if (err) {
                    throw err;
                } else {
                    allData["articles"] = arts;
                    sse.send(allData);
                    console.log("alldata is sent! ", allData);
                    res.status(204).send();
                }
            });
        }
    });
});

// the legal link in the footer
app.get("/policy/9db0094a1e0f", (req, res) => {
    res.send("Yes it's legal.. Why do you ask?");
});

// when clicking on the userName in the recommendation copmponent
app.get("/user", (req, res) => {
    res.send("looks like i'm a user");
});

app.get("*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../public`));
});

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});