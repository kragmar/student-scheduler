const router = require("express").Router();
const ctrlStudent = require("../controllers/student.controller");

// Create a new student
router.post("/", ctrlStudent.create);

// Retrieve all student
router.get("/", ctrlStudent.findAll);

// Retrieve a single student with id
router.get("/:id", ctrlStudent.findOne);

// Update a student with id
router.put("/:id", ctrlStudent.update);

// Delete a student with id
router.delete("/:id", ctrlStudent.delete);

module.exports = router;
