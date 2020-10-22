var router = require("express").Router();
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
const ctrlStudent = require("../controllers/student.controller");

// Create a new student
router.post("/", function (req, res) {
  /* Student.create(); */
  ctrlStudent.create;
});

// Retrieve all student
router.get("/", function (req, res) {
  Student.findAll();
});

// Retrieve a single student with id
router.get("/:id", function (req, res) {
  Student.findOne();
});

// Update a student with id
router.put("/:id", function (req, res) {
  Student.update();
});

// Delete a student with id
router.delete("/:id", function (req, res) {
  Student.delete();
});

module.exports = router;
