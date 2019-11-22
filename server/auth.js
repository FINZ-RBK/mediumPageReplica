const jwt = require("jsonwebtoken");
const config = require ('../config')


function generateAccessToken(user) {
    return jwt.sign(user, config.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000000s"
    });
  }

  
  module.exports.generateAccessToken = generateAccessToken