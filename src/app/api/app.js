const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

require("./models/db.model");
require("./config/passport.config");

// api imports
const authApi = require("./routes/index.routes");
const studentsApi = require("./routes/student.routes");
const lessonsApi = require("./routes/lesson.routes");
const messageApi = require("./routes/message.routes");
const teacherApi = require("./routes/teacher.routes");
const curriculumApi = require("./routes/curriculum.routes");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

// api routes
app.use("/api", authApi);
app.use("/api/students", studentsApi);
app.use("/api/lessons", lessonsApi);
app.use("/api/messages", messageApi);
app.use("/api/teachers", teacherApi);
app.use("/api/curriculum", curriculumApi);

app.use(function (req, res, next) {
  var err = new Error("Not found");
  err.status = 404;
  next(err);
});

// error handlers
app.use(function (err, req, res) {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }
});

module.exports = app;
