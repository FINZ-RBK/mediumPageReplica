const path = require("path");
var SRC_DIR = path.join(__dirname, "/src/index.jsx");
var DIST_DIR = path.join(__dirname, "/public/");
module.exports = {
  entry: SRC_DIR,
  output: {
    path: DIST_DIR,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      }
    ]
  },
  mode: "development"
};
