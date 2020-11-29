const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    recurring: {
      type: Boolean,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model("Lesson", lessonSchema);
