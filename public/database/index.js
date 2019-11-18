const mongoose = require('../node_modules/mongoose/index.js');
const uri = process.env.mongoURI;
var User =  require('./models/User');
var Article = require('./models/Article');
var Category = require('./models/Category');


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




const categorySchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: {type: String}
});


const Category = mongoose.model('Category', categorySchema);

const selectAll = function(obj, id, callback) {
  obj.find({ id: id }, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

const getAuthor = function(model, authorId, callback) {
  model.findOne({ id: authorId }).exec(function(err, user) {
    if (err) throw err;
    callback(user);
  });
};

module.exports.getAuthor = getAuthor;
module.exports.selectAll = selectAll;
module.exports.Category = Category;
