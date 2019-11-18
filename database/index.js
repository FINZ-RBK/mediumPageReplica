const mongoose = require("../node_modules/mongoose/index.js");
var User = require("./models/User");
var Article = require("./models/Article").Article;
var Category = require("./models/Category");

const uri =
  process.env.mongoURI ||
  "mongodb+srv://fatoom:fatoom@cluster0-hft43.mongodb.net/mediunDB?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: "mediunDB"
  })
  .catch(error => console.log("this is error!", error));

const { connection } = mongoose;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// const selectAll = function(obj, id, callback) {
//   obj.find({ id: id }, function(err, items) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// const getFeatured = Article.find({})
//   .sort(["clapsNumber", 1])
//   .select(
//     "title subTitle pic createdAt readingTime categoryId clapsNumber authorId"
//   )
//   .exec(callback);

// const getAuthor = function(model, authorId, callback) {
//   model.findOne({ id: authorId }).exec(function(err, user) {
//     if (err) throw err;
//     callback(user);
//   });
// };

// const getCategory = function(model, categoryId, callback) {
//   model.findOne({ id: categoryId }).exec(function(err, category) {
//     if (err) throw err;
//     callback(category);
//   });
// };

const getLatest = Article.find({}).select(
  "title subTitle pic createdAt readingTime categoryId clapsNumber authorId"
);

// module.exports.getAuthor = getAuthor;
// module.exports.selectAll = selectAll;
// module.exports.getFeatured = getFeatured;
// module.exports.getCategory = getCategory;
// module.exports.Category = Category;
module.exports.getLatest = getLatest;
// module.exports.Article = Article;
// module.exports.User = User;
