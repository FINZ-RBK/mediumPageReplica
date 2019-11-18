var mongoose = require("mongoose");

//GET the Schema constructor

var Schema = mongoose.Schema;

const articleSchema = new Schema({
    id: { type: Number, unique: true },
    authorId: { type: Number },
    title: { type: String },
    subTitle: { type: String },
    pic: { type: String },
    createdAt: { type: Date, default: Date.now },
    readingTime: { type: Number },
    text: { type: String },
    clapsNumber: { type: Number },
    categoryId: {type: Number},
    comments: { type: Array },
    tags: { type: Array }
  });

const Article = mongoose.model('Article', articleSchema);

module.exports.Article = Article;

