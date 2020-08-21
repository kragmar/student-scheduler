const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model")(mongoose);
db.lesson = require("./lesson.model")(mongoose);
db.student = require("./student.model")(mongoose);
db.teacher = require("./teacher.model")(mongoose);

module.exports = db;
