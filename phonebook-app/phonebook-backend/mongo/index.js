const mongoose = require("mongoose");
const Person = require("./models/person");
const { MONGO_URL } = require("../utils/config");

if (MONGO_URL && !mongoose.connection.readyState) {
  console.log("trying to connect..");
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to mongo");
    })
    .catch((error) => {
      console.log("MONGO connection failded:", error);
    });
}
module.exports = {
  Person,
};
