const mongoose = require("mongoose");

var studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telNum: {
      type: String,
      required: true,
    },
    birthDate: Date,
  },
  {
    timestamps: true,
  }
);

mongoose.model("Student", studentSchema);
