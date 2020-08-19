const db = require("../models");
const Lesson = db.lesson;

// Create and save new lesson
exports.create = (req, res) => {
  // Create a new lesson
  const lesson = new Lesson({
    date: req.body.date,
    start: req.body.start,
    type: req.body.type,
    student: req.body.student,
    teacher: req.body.teacher,
  });

  // Save lesson in the db
  lesson
    .save(lesson)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the lesonn.",
      });
    });
};

// Find all lessons in the db
exports.findAll = (req, res) => {
  Lesson.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving lessons.",
      });
    });
};

// Find lesson by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Lesson.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found lesson with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving lesson with id=" + id });
    });
};

// Update lesson by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Lesson.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update lesson with id=${id}. Maybe user was not found!`,
        });
      } else res.send({ message: "Lesson was updated succesfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating lesson with id=" + id,
      });
    });
};

// Delete lesson by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Lesson.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete lesson with id=${id}. Maybe lesson was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete lesson with id=" + id,
      });
    });
};
