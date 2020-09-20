const mongoose = require("mongoose");
var gracefulShutdown;
const dbUri =
  "mongodb+srv://drumkiller:DrumkillerRoot24@devcluster0.c9rn0.mongodb.net/Drumkiller?retryWrites=true&w=majority";

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CONNECTION EVENTS
mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to " + dbUri);
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// to be called when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};

// for app termination
process.on("SIGINT", function () {
  gracefulShutdown("app termination", function () {
    process.exit(0);
  });
});

// SCHEMAS AND MODELS
require("./user.model");
