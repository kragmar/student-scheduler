const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    schedule: {
      type: [Date],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Teacher", teacherSchema);
