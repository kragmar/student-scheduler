const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

require("./models/db.model");
require("./config/passport.config");

// api imports
const authApi = require("./routes/index.routes");
const studentsApi = require("./routes/student.routes");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

// api routes
app.use("/api", authApi);
app.use("/api/students", studentsApi);

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
