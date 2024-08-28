const mongoose = require("mongoose");
const config = require("../config.js");

module.exports = function () {
  mongoose
    .connect(config.connectionstring)
    .then(function () {
      console.log("Database connection established");
    })
    .catch(function (error) {
      console.log("Database connection failed: ", error);
    });
};
