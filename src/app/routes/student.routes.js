var router = require("express").Router();

// Create a new student
router.post("/", function (req, res) {
  res.json();
});

// Retrieve all student
router.get("/", student.findAll);

// Retrieve a single student with id
router.get("/:id", student.findOne);

// Update a student with id
router.put("/:id", student.update);

// Delete a student with id
router.delete("/:id", student.delete);

module.exports = router;
