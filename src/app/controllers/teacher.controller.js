const db = require("../models");
const Teacher = db.teacher;

// Create and save new teacher
exports.create = (req, res) => {
  // Create a new teacher
  const teacher = new Teacher({
    name: req.body.name,
  });

  // Save teacher in the db
  teacher
    .save(teacher)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the teacher.",
      });
    });
};

// Find all teachers in the db
exports.findAll = (req, res) => {
  Teacher.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving teachers.",
      });
    });
};

// Find teacher by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Teacher.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found teacher with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving teacher with id=" + id });
    });
};

// Update teacher by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Teacher.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update teacher with id=${id}. Maybe user was not found!`,
        });
      } else res.send({ message: "teacher was updated succesfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating teacher with id=" + id,
      });
    });
};

// Delete teacher by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Teacher.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete teacher with id=${id}. Maybe teacher was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete teacher with id=" + id,
      });
    });
};
