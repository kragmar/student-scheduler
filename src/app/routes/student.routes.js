const router = require("express").Router();
const studentCtrl = require("../controllers/student.controller");

// Create a new student
router.post("/", studentCtrl.create);

// Retrieve all student
router.get("/", studentCtrl.findAll);

// Retrieve a single student with id
router.get("/:id", studentCtrl.findOne);

// Update a student with id
router.put("/:id", studentCtrl.update);

// Delete a student with id
router.delete("/:id", studentCtrl.delete);

module.exports = router;
