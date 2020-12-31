const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: String,
    privileges: String,
  },
  {
    timestamps: true,
  }
);

mongoose.model("Teacher", teacherSchema);
