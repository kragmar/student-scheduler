const mongoose = require("mongoose");
const Student = mongoose.model("Student");

// Create and save new student
exports.create = (req, res) => {
  // Create a new student
  const student = new Student({
    name: req.body.name,
    telNum: req.body.telNum,
    email: req.body.email,
    birthDate: req.body.birthDate,
  });

  // Save student in the db
  student
    .save(student)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the lesonn.",
      });
    });
};

// Find all students in the db
exports.findAll = (req, res) => {
  Student.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving students.",
      });
    });
};

// Find student by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Student.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found student with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving student with id=" + id });
    });
};

// Update student by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update student with id=${id}. Maybe user was not found!`,
        });
      } else res.send({ message: "student was updated succesfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating student with id=" + id,
      });
    });
};

// Delete student by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Student.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete student with id=${id}. Maybe student was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete student with id=" + id,
      });
    });
};
