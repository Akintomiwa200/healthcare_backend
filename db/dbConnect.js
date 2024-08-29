const mongoose = require("mongoose");
const config = require("../config.js");

module.exports = function () {
  mongoose
    // .connect(config.connectionstring)
    .connect(config.dbUri)
    .then(function () {
      console.log("Connected to MongoDB");
    })
    .catch(function (error) {
      console.log("Database connection failed: ", error);
    });
};
