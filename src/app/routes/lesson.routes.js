module.exports = (app) => {
  const lesson = require("../controllers/lesson.controller");

  var router = require("express").Router();

  // Create a new lesson
  router.post("/", lesson.create);

  // Retrieve all lesson
  router.get("/", lesson.findAll);

  // Retrieve a single lesson with id
  router.get("/:id", lesson.findOne);

  // Update a lesson with id
  router.put("/:id", lesson.update);

  // Delete a lesson with id
  router.delete("/:id", lesson.delete);

  // App uses this route
  app.use("/api/lessons", router);
};
