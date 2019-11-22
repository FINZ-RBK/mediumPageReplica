const mongoose = require("../node_modules/mongoose/index.js");
var User = require("./models/User").User;
var Article = require("./models/Article").Article;
var Category = require("./models/Category").Category;
const config = require ("../config")
// var uri ="mongodb+srv://fatoom:fatoom@cluster0-lv76n.mongodb.net/mediunDB?retryWrites=true&w=majority"

mongoose
  .connect(config.mongoURI, {
      // .connect(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: "mediunDB"
  })
  .catch(error => console.log("this is error!", error));

const { connection } = mongoose;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//need to be refactored
const selectAll = function (obj, id, callback) {
  obj.find({ id: id }, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

const getUsers = function (callback) {
  User.find({}).exec(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      callback(user);
    }
  });
};

const getFeatured = function (callback) {
  Article.find({ clapsNumber: { $gte: 100 } })
    .limit(1)
    .select(
      "title subTitle pic createdAt readingTime categoryId clapsNumber authorId"
    )
    .exec(function (err, article) {
      if (err) {
        callback(err, null);
      } else {
        var articleAuthor;
        getAuthor(User, article[0].authorId, function (err, author) {
          if (err) {
            console.log(err);
          } else {
            var feauredArticle = { article: article[0], articleAuthor: author };
            // console.log(feauredArticle);
            callback(null, feauredArticle);
          }
        });
      }
    });
};

const getAuthor = function (model, authorId, callback) {
  model.findOne({ id: authorId }).exec(function (err, user) {
    if (err) callback(err, null);
    callback(null, user);
  });
};

const getCategory = function (model, categoryId, callback) {
  model.findOne({ id: categoryId }).exec(function (err, category) {
    if (err) throw err;
    callback(category);
  });
};

const getLatest = function (callback) {
  Article.find({})
    .sort(["createdAt", 1])
    .select(
      "title subTitle pic createdAt readingTime categoryId clapsNumber authorId"
    )
    .exec(function (err, article) {
      if (err) {
        console.log(err);
      } else {
        callback(article);
      }
    });
};
var signUp = function (user, callback) {
  var userModel = new User({
    id: new Date().getTime(),
    name: user.name,
    password: user.password,
    email: user.email,
    pic:
      "https://cdn5.vectorstock.com/i/1000x1000/85/94/person-gray-photo-placeholder-man-silhouette-sign-vector-23838594.jpg"
  });
  User.findOne({ email: user.email }, (err, user) => {
    if (user) {
      callback("User is already exists");
      return;
    } else
      userModel.save(err => {
        if (err) {
          console.log(err);
          callback(err);
        }
        callback(null, user);
      });
  });
};

var getUser = function (user, callback) {
  User.findOne({ email: user.email }).exec((err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      // console.log(data);

      callback(null, data);
    }
  });
};

module.exports.getAuthor = getAuthor;
module.exports.selectAll = selectAll;
module.exports.getUsers = getUsers;
module.exports.getFeatured = getFeatured;
module.exports.getCategory = getCategory;
module.exports.Category = Category;
module.exports.getLatest = getLatest;
module.exports.Article = Article;
module.exports.User = User;
module.exports.signUp = signUp;
module.exports.getUser = getUser;
