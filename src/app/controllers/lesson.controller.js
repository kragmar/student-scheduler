const mongoose = require("mongoose");
const Lesson = mongoose.model("Lesson");

// Create and save new lesson
module.exports.create = (req, res) => {
  // Create a new lesson
  const lesson = new Lesson({
    date: req.body.date,
    type: req.body.type,
    recurring: req.body.recurring,
    studentId: req.body.studentId,
    teacherId: req.body.teacherId,
  });

  // Save lesson in the db
  lesson
    .save(lesson)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the lesson.",
      });
    });
};

// Find all lessons in the db
module.exports.findAll = (req, res) => {
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
module.exports.findOne = (req, res) => {
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
module.exports.update = (req, res) => {
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
module.exports.delete = (req, res) => {
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
