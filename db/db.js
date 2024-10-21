const mongoose = require("mongoose");

module.exports.connectToMonogoDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.URL_Monogo)
    .then(() => {
      console.log("connect to DB");
    })
    .catch((err) => {
      console.log(err.message);
    });
};