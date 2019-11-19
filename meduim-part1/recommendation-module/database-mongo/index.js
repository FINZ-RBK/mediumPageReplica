const mongoose = require("../node_modules/mongoose/index.js");
const config = require("../../config.js");
const uri = process.env.mongoURI || config.mongoURI;

// check mongoose connection
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        dbName: "mediunDB"
    })
    .catch(error => console.log("this is error!", error));

const { connection } = mongoose;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully!");
});

// the user schema
const userSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    pic: { type: String },
    email: { type: String },
    bio: { type: String }
});

// the article schema
const articleSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    authorId: { type: Number },
    title: { type: String },
    subTitle: { type: String },
    pic: { type: String },
    createdAt: { type: Date, default: Date.now },
    readingTime: { type: Number },
    text: { type: String },
    clapsNumber: { type: Number },
    comments: { type: Array },
    tags: { type: Array }
});

//creating the models
const User = mongoose.model("User", userSchema);
const Article = mongoose.model("Article", articleSchema);

// selectAll to get data from db depeding on the model i send.
const selectAll = function(model, callback) {
    model.find({}, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

// saveUsers to save users from the dummyData file..

// const saveUsers = function(arrayOfObjs) {
//   for (var i = 0; i < arrayOfObjs.length; i++) {
//     const one = new User({
//       id: arrayOfObjs[i].id,
//       name: arrayOfObjs[i].name,
//       pic: arrayOfObjs[i].pic,
//       email: arrayOfObjs[i].email,
//       bio: arrayOfObjs[i].bio
//     });
//     one.save();
//     // console.log("ONE WAS ADDED");
//   }
// };
// saveUsers(dummy);

// saveArt to save articles from the dummyData file..

// const saveArt = function(arrayOfObjs) {
//   for (var i = 0; i < arrayOfObjs.length; i++) {
//     const one = new Article({
//       id: arrayOfObjs[i].id,
//       authorId: arrayOfObjs[i].authorId,
//       title: arrayOfObjs[i].title,
//       subTitle: arrayOfObjs[i].subTitle,
//       pic: arrayOfObjs[i].pic,
//       createdAt: arrayOfObjs[i].createdAt,
//       readingTime: arrayOfObjs[i].readingTime,
//       text: arrayOfObjs[i].text,
//       clapsNumber: arrayOfObjs[i].clapsNumber,
//       comments: arrayOfObjs[i].comments,
//       suggested: arrayOfObjs[i].suggested,
//       tags: arrayOfObjs[i].tags
//     });
//     one.save();
//     // console.log("ONE WAS ADDED");
//   }
// };

// module.exports.saveUsers = saveUsers;
// module.exports.saveArt = saveArt;
module.exports.selectAll = selectAll;
module.exports.User = User;
module.exports.Article = Article;