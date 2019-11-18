var mongoose = require("mongoose");

//GET the Schema constructor
console.log('Hi from Hell');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    pic: { type: String },
    email: { type: String },
    bio: { type: String }
  });

const User = mongoose.model('User', userSchema);

module.exports.User = User;
