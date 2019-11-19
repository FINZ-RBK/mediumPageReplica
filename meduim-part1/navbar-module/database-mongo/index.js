const mongoose = require("../node_modules/mongoose/index.js");
const config = require("../../config.js");
//
const uri = process.env.mongoURI || config.mongoURI;

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

const userSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    pic: { type: String },
    email: { type: String },
    bio: { type: String }
});

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
    suggested: { type: Array },
    tags: { type: Array }
});

const User = mongoose.model("User", userSchema);
const Article = mongoose.model("Article", articleSchema);

const selectAll = function(obj, id, callback) {
    obj.find({ id: id }, function(err, items) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, items);
        }
    });
};

module.exports.selectAll = selectAll;
module.exports.User = User;
module.exports.Article = Article;