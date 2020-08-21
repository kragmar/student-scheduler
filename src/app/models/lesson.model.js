const Student = require("./student.model");
const Teacher = require("./teacher.model");
const { Schema } = require("mongoose");

const studentSchema = new Schema(Student);
const teacherSchema = new Schema(Teacher);

module.exports = (mongoose) => {
  const Lesson = mongoose.model(
    "lesson",
    mongoose.Schema(
      {
        date: Date,
        start: String,
        type: String,
        student: [studentSchema],
        teacher: [teacherSchema],
      },
      { timestamps: true }
    )
  );

  return Lesson;
};
