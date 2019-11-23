var faker = require("faker");

var accounts = [];
const oldData = [];

const mongoose = require("mongoose");
async function run() {
  var legacyDataBase =
    "mongodb+srv://mediun:mediun@cluster0-lv76n.mongodb.net/mediunDB?retryWrites=true&w=majority";
  mongoose
    .connect(legacyDataBase, {
      useNewUrlParser: true,
      useCreateIndex: true,
      dbName: "mediunDB"
    })
    .catch(error => console.log("this is error!", error));

  const { connection } = mongoose;

  connection.once("open", () => {
    console.log("MongoDB legacydataBase connection established successfully");
  });

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
    categoryId: { type: Number },
    comments: { type: Array },
    tags: { type: Array }
  });

  const Articles = mongoose.model("Article", articleSchema);

  try {
    accounts = await Articles.find({}, "-_id  _id_", (error, data) => {
      if (error) {
        console.log(error, "error");
      } else {
      }
    }).select(
      "title subTitle pic createdAt readingTime categoryId clapsNumber text authorId"
    );
  } catch (erro) {
    console.log("error", erro);
  }
  //connection.close();
  var newRecord = [];

  for (var i = 0; i < accounts.length; i++) {
    var obj = {
      id: faker.random.number(),
      authorId: accounts[i]["authorId"],
      title: accounts[i]["title"],
      subTitle: accounts[i]["subTitle"],
      pic: accounts[i]["pic"],
      createdAt: accounts[i]["createdAt"],
      readingTime: accounts[i]["readingTime"],
      text: accounts[i]["text"],
      clapsNumber: accounts[i]["clapsNumber"],
      categoryId: accounts[i]["categoryId"],
      comments: accounts[i]["comments"],
      tags: accounts[i]["tags"]
    };
    console.log(obj);
    oldData.push(obj);
  }
}

run().finally(() => {
  delete mongoose.connection.models["Article"];
  var legacyDataBase =
    "mongodb+srv://fatoom:fatoom@cluster0-hft43.mongodb.net/mediunDB?retryWrites=true&w=majority";

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
    categoryId: { type: Number },
    comments: { type: Array },
    tags: { type: Array }
  });

  const Articles = mongoose.model("Article", articleSchema);

  mongoose
    .connect(legacyDataBase, {
      useNewUrlParser: true,
      useCreateIndex: true,
      dbName: "mediunDB"
    })
    .catch(error => console.log("this is error!", error));

  const { connection } = mongoose;

  connection.once("open", () => {
    console.log("MongoDB newDataBase connection established successfully");
    for (var i = 0; i < oldData.length; i++) {
      var d = new Articles(oldData[i]);
      d.save((error, res) => {
        if (error) {
          console.log(error);
        } else {
          console.log("done");
        }
      });
    }
  });
});
