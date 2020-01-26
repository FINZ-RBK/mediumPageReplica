var mongoose = require("mongoose");

//GET the Schema constructor
var Schema = mongoose.Schema;

//User Schema
const userSchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    pic: { type: String },
    email: { type: String },
    bio: { type: String }
  });

//User model
const User = mongoose.model('User', userSchema);

//Export Model
module.exports.User = User;
