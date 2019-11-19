var mongoose = require("mongoose");

//GET the Schema constructor

var Schema = mongoose.Schema;

const categorySchema = new Schema({
  id: { type: Number, unique: true },
  name: { type: String }
});


const Category = mongoose.model('Category', categorySchema);
module.exports.Category = Category;