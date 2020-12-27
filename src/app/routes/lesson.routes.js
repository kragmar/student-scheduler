const router = require("express").Router();
const lessonCtrl = require("../controllers/lesson.controller");

// Create a new lesson
router.post("/", lessonCtrl.create);

// Retrieve all lessons
router.get("/", lessonCtrl.findAll);

// Retrieve a single lesson with id
router.get("/:id", lessonCtrl.findOne);

// Retrieve all lessons by student id
router.get("/student/:studentId", lessonCtrl.findAllByStudentId);

// Retrieve all of today's lessons
router.get("/date/", lessonCtrl.findAllToday);

// Retrieve all lessons after today
router.get("/date/:datetime", lessonCtrl.findAllAfterToday);

// Update a lesson with id
router.put("/:id", lessonCtrl.update);

// Delete a lesson with id
router.delete("/:id", lessonCtrl.delete);

module.exports = router;
