const router = require("express").Router();
const curriculumCtrl = require("../controllers/curriculum.controller");

// Create a new curriculum
router.post("/", curriculumCtrl.create);

// Retrieve all curriculums
router.get("/", curriculumCtrl.findAll);

// Retrieve a single curriculum with id
router.get("/:id", curriculumCtrl.findOne);

// Update a curriculum with id
router.put("/:id", curriculumCtrl.update);

// Delete a curriculum with id
router.delete("/:id", curriculumCtrl.delete);

module.exports = router;
