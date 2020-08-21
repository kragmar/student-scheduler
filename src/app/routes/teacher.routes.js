module.exports = (app) => {
  const teacher = require("../controllers/teacher.controller");

  var router = require("express").Router();

  // Create a new teacher
  router.post("/", teacher.create);

  // Retrieve all teacher
  router.get("/", teacher.findAll);

  // Retrieve a single teacher with id
  router.get("/:id", teacher.findOne);

  // Update a teacher with id
  router.put("/:id", teacher.update);

  // Delete a teacher with id
  router.delete("/:id", teacher.delete);

  // App uses this route
  app.use("/api/teachers", router);
};
