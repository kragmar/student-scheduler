const { mongoose } = require(".");

module.exports = (mongoose) => {
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
