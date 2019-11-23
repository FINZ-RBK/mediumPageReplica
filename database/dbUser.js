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

  const userSchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    pic: { type: String },
    password: { type: String },
    email: { type: String },
    bio: { type: String }
  });

  const User = mongoose.model("User", userSchema);

  try {
    accounts = await User.find({}, "-_id ", (error, data) => {
      if (error) {
        console.log(error, "error");
      } else {
        console.log(data);
      }
    }).select("name password email bio pic id");
  } catch (erro) {
    console.log("error", erro);
  }
  //connection.close();
  var newRecord = [];

  for (var i = 0; i < accounts.length; i++) {
    var obj = {
      id: faker.random.number(),
      pic: accounts[i]["pic"],
      name: accounts[i]["name"],
      password: accounts[i]["password"],
      email: accounts[i]["email"],
      bio: accounts[i]["bio"]
    };
    console.log(obj.name);

    console.log(obj);
    oldData.push(obj);
  }
}

run().finally(() => {
  delete mongoose.connection.models["User"];
  var legacyDataBase =
    "mongodb+srv://fatoom:fatoom@cluster0-hft43.mongodb.net/mediunDB?retryWrites=true&w=majority";

  var Schema = mongoose.Schema;

  const userSchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    pic: { type: String },
    password: { type: String },
    email: { type: String },
    bio: { type: String }
  });

  const User = mongoose.model("User", userSchema);
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
      var d = new User(oldData[i]);
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
