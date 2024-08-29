// const mongoose = require('mongoose');
const dbConnect = require("./db/dbConnect");
const app = require("./app");
const config = require("./config");


dbConnect();
app.listen(config.port, () => {
  console.log(`Server is running on port https://localhost:${config.port}`);
});
