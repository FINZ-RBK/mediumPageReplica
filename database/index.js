//Database class to deal with all models and export them
const mongoose = require('../node_modules/mongoose/index.js');
var User =  require('./models/User');
var  Article = require('./models/Article');
var Category = require('./models/Category');

//Database uri
const uri = "mongodb+srv://fatoom:fatoom@cluster0-hft43.mongodb.net/mediunDB?retryWrites=true&w=majority";

//Make connection to Database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: 'mediunDB'
  })
  .catch((error) => console.log('this is error!', error));

const { connection } = mongoose;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//Function to get all users
const getUsers =  function(callback) {
  User.find({}).
exec(function (err, user) {
  if(err){ console.log(err)}
     else {callback(user)}
})
}; 

//Function to get featured articles
const getFeatured= function(callback){
                      Article.find({}).
                      sort(['clapsNumber', 1]).
                      select('title subTitle pic createdAt readingTime categoryId clapsNumber authorId')
                      .exec(function (err, article) {
                        if(err){ console.log(err)}
                           else {callback(article)}
                      }); 

                    }

//Function to get author by id
const getAuthor = function(model, authorId, callback) {
  model.findOne({ id: authorId }).exec(function(err, user) {
    if (err) throw err;
    callback(user);
  });
};

//Function to get Category by id
const getCategory = function(model, categoryId, callback) {
  model.findOne({ id: categoryId }).exec(function(err, category) {
    if (err) throw err;
    callback(category);
  });
};

//Function to get latest article 
const getLatest = function(callback){
                  Article.find({}).
                  sort(['createdAt', 1]).
                  select('title subTitle pic createdAt readingTime categoryId clapsNumber authorId').
                  exec(function (err, article) {
                    if(err){ console.log(err)}
                       else {callback(article)}
                  });
                }

//export models to use them in other classes
module.exports.getAuthor = getAuthor;
module.exports.selectAll = selectAll;
module.exports.getUsers = getUsers;
module.exports.getFeatured = getFeatured;
module.exports.getCategory = getCategory;
module.exports.Category = Category;
module.exports.getLatest = getLatest;
module.exports.Article = Article;
module.exports.User = User;

