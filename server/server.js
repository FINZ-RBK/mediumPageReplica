const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
// const auth = require("./middleware/auth");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const db = require(path.join(__dirname, "../database/index.js"));
const app = express();
const port = process.env.PORT || 3004;
const { check, validationResult } = require("express-validator");
const config = require("../config");
const auth = require("./auth");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// const publicPath = path.join(__dirname, '..', 'public');
// app.use(express.static(publicPath));
// app.use(express.static('./../node_modules'));
// app.get('/hello', (req, res) => {
//     res.send('hello');
//     //res.sendFile(path.resolve(__dirname, 'client', 'build', 'bundle.js'));
// })

app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});
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
  console.log(res.header.toString(), "header");

  db.Category.find({ id: req.query.id })
    .select("name")
    .then((categ, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(categ[0].name);
        var data = categ[0].name;
        res.send(data);
        // console.log(err);
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
    const accessToken = auth.generateAccessToken(req.body);
    res.cookie(config.HEADER_AUTH, accessToken);

    if (!errors.isEmpty()) {
      return res.status(203).json({ errors: errors.array() });
    }
    try {
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      const user = {
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email
      };
      db.signUp(user, err => {
        // try {
        if (err) {
          // throw err;
          return res.status(201).send({ errors: [err] });
        }
        // } catch {}

        return res.status(200).send("sucess");
        // res.send("success");
      });
    } catch {
      return res.status(201).send({ errors: ["check your password please!"] });
    }
  }
);

app.post(
  "/users/login",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(203).json({ errors: errors.array() });
    }
    var accessToken = auth.generateAccessToken(req.body);
    res.cookie(config.HEADER_AUTH, accessToken);
    db.getUser(req.body, async (err, user) => {
      if (err) {
        return res.status(201).send({ errors: ["not found"] });
      }
      try {
        // console.log(user.password);
        if (await bcryptjs.compare(req.body.password, user.password)) {
          return res.status(200).send(user);
        } else {
          return res
            .status(201)
            .send({ errors: ["check your password please!"] });
        }
      } catch {
        res.status(201).send({ errors: ["Error in Auth"] });
      }
    });
  }
);

app.get("/users/user", (req, res) => {
  var token = req.headers[config.HEADER_AUTH];
  if (token == null) return res.sendStatus(401);
  try {
    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      db.getUser(user, (err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.status(200).send(user);
      });
    });
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
});
if (process.env.NODE_ENV === 'production') {

    app.use(express.static('../build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
    })

}
app.listen(port, () => {
  console.log("connected on port" + port);
});
