const mongoose = require("mongoose");
const Message = mongoose.model("Message");

module.exports.create = (req, res) => {
  const message = new Message({
    title: req.body.title,
    message: req.body.message,
    type: req.body.type,
    teacherId: req.body.teacherId,
  });

  message
    .save(message)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the message.",
      });
    });
};

module.exports.findAll = (req, res) => {
  Message.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving messages.",
      });
    });
};

module.exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Message.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update message with id=${id}. Maybe message was not found!`,
        });
      } else res.send({ message: "Message was updated succesfully." });
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating message with id=" + id,
      });
    });
};

module.exports.delete = (req, res) => {
  const id = req.params.id;

  Message.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete message with id=${id}. Maybe message was not found!`,
        });
      } else {
        res.send({
          message: "Message was deleted successfully!",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete message with id=" + id,
      });
    });
};
