const mongoose = require("mongoose");
const Curriculum = mongoose.model("curriculum");

// Create and save new curriculum
module.exports.create = (req, res) => {
  // Create a new curriculum
  const curriculum = new Curriculum({
    date: req.body.date,
    type: req.body.type,
    recurring: req.body.recurring,
    studentId: req.body.studentId,
    teacherId: req.body.teacherId,
  });

  // Save curriculum in the db
  curriculum
    .save(curriculum)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the curriculum.",
      });
    });
};

// Find all curriculums in the db
module.exports.findAll = (req, res) => {
  Curriculum.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving curriculums.",
      });
    });
};

// Find curriculum by id
module.exports.findOne = (req, res) => {
  const id = req.params.id;

  Curriculum.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found curriculum with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: "Error retrieving curriculum with id=" + id });
    });
};

// Update curriculum by id
module.exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Curriculum.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update curriculum with id=${id}. Maybe curriculum was not found!`,
        });
      } else res.send({ message: "curriculum was updated succesfully." });
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating curriculum with id=" + id,
      });
    });
};

// Delete curriculum by id
module.exports.delete = (req, res) => {
  const id = req.params.id;

  Curriculum.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete curriculum with id=${id}. Maybe curriculum was not found!`,
        });
      } else {
        res.send({
          message: "Curriculum was deleted successfully!",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete curriculum with id=" + id,
      });
    });
};
