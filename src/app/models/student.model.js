/* module.exports = (mongoose) => {
  const Student = mongoose.model(
    "student",
    mongoose.Schema(
      {
        name: String,
        telNum: String,
        email: String,
        birthDate: Date,
      },
      { timestamps: true }
    )
  );

  return Student;
};
 */

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
