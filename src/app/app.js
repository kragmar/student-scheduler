const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

require("./models/db.model");
require("./config/passport.config");

const routesApi = require("./routes/index.routes");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use("/api", routesApi);

app.use(function (req, res, next) {
  var err = new Error("Not found");
  err.status = 404;
  next(err);
});

// error handlers
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }
});

module.exports = app;
