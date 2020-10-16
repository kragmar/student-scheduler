const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload",
  algorithms: ["HS256"],
});
const ctrlAuth = require("../controllers/authentication.controller");
const ctrlStudent = require("../controllers/student.controller");

// authentication and registration
router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

// student routes
router.use("/students", ctrlStudent);

module.exports = router;
