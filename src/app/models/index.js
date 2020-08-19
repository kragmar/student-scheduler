const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.lesson = require("./lesson.model.js")(mongoose);
db.student = require("./lesson.model")(mongoose);

module.exports = db;
