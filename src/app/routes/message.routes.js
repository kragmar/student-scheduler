const router = require("express").Router();
const messageCtrl = require("../controllers/message.controller");

// Create a new lesson
router.post("/", messageCtrl.create);

// Retrieve all lessons
router.get("/", messageCtrl.findAll);

// Update a lesson with id
router.put("/:id", messageCtrl.update);

// Delete a lesson with id
router.delete("/:id", messageCtrl.delete);

module.exports = router;
