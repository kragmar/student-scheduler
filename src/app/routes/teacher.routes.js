const router = require("express").Router();
const teacherCtrl = require("../controllers/teacher.controller");

// Create a new teacher
router.post("/", teacherCtrl.create);

// Retrieve all teacher
router.get("/", teacherCtrl.findAll);

// Retrieve a single teacher with id
router.get("/:id", teacherCtrl.findOne);

// Update a teacher with id
router.put("/:id", teacherCtrl.update);

// Delete a teacher with id
router.delete("/:id", teacherCtrl.delete);

module.exports = router;
