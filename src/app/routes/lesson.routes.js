const router = require("express").Router();
const lessonCtrl = require("../controllers/lesson.controller");

// Create a new lesson
router.post("/", lessonCtrl.create);

// Retrieve all lesson
router.get("/", lessonCtrl.findAll);

// Retrieve a single lesson with id
router.get("/:id", lessonCtrl.findOne);

// Update a lesson with id
router.put("/:id", lessonCtrl.update);

// Delete a lesson with id
router.delete("/:id", lessonCtrl.delete);

module.exports = router;
