const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload",
  algorithms: ["HS256"],
});
const ctrlAuth = require("../controllers/authentication.controller");

// authentication and registration
router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

module.exports = router;
