const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
// const auth = require("./middleware/auth");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const db = require(path.join(__dirname, "../database/index.js"));
const app = express();
const port = process.env.PORT || 3004;
const { check, validationResult } = require("express-validator");
const ACCESS_TOKEN_SECRET =
  "26e94a2ccce0c6b4691f2760e9346645a1308e3c56c77aa14bbff993c05153c4efdf258e055595550a80f834d12144f7412efa0b2f34fb4036cdc302be77468e";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
<<<<<<< HEAD
const port = process.env.PORT || 3004;
app.get("/articles/getFeatured", function (req, res) {
    console.log('reached ')
    db.getFeatured(function (err, article) {
        if (err) {
            res.statusCode(504);
        }
        res.json(article);
    });
=======
app.use(cookieParser());
>>>>>>> 66ec7b08a4251c3ba8d4b8110a0cef8194e733cd

app.get("/articles/getFeatured", function(req, res) {
  db.getFeatured(function(err, article) {
    if (err) {
      res.statusCode(504);
    }
    res.json(article);
  });
});

app.get("/articles/getUser", (req, res) => {
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
  db.Category.find({ id: req.query.id })
    .select("name")
    .then((categ, err) => {
      if (err) {
        // console.log(err);
      } else {
        //console.log(categ.name);
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

  //res.sendFile(path.resolve(__dirname, 'client', 'build', 'bundle.js'));
});

app.post(
  "/users/signup",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    const accessToken = generateAccessToken(req.body);
    res.cookie("x-access-token", accessToken);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = {
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email
      };
      db.signUp(user, err => {
        // try {
        if (err) {
          // throw err;
          return res.status(500).send(err);
        }
        // } catch {}

        return res.status(201).send("sucess :" + accessToken);
        // res.send("success");
      });
    } catch {
      return res.status(500).send("error");
    }
  }
);

app.post(
  "/users/login",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  async (req, res) => {
    // console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var accessToken = generateAccessToken(req.body);
    res.cookie("x-access-token", accessToken);
    db.getUser(req.body, async (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      try {
        // console.log(user.password);
        if (await bcrypt.compare(req.body.password, user.password)) {
          return res.status(200).send(user);
        } else {
          return res.status(403).send("check your password please!");
        }
      } catch {
        res.status(500).send("Error in Auth");
      }
    });
  }
);

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: "36000000s"
  });
}

app.get("/user", (req, res) => {
  var token = req.headers["x-access-token"];
  if (token == null) return res.sendStatus(401);
  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      //   console.log(err);
      if (err) return res.sendStatus(403);
      // req.user = user;
      db.getUser(user, (err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.send(user);
      });
    });
  } catch (err) {
    // console.log(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
});

app.listen(port, () => {
  console.log("connected on port" + port);
});
