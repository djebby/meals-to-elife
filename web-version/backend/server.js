const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const sequelize = require("./models/sequelize-connection.js");
const stockRouters = require("./routes/stocks-routes.js");
const log = console.log;


app.use(bodyParser.json());
app.use("/api/stocks", stockRouters);

sequelize
  .authenticate()
  .then((success) => {
    log("Successfully connected to the database");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => log(`Application is running at port ${PORT}`));
  })
  .catch((error) => log(error.message));