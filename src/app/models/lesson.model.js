module.exports = (mongoose) => {
  const Lesson = mongoose.model(
    "lesson",
    mongoose.Schema(
      {
        date: Date,
        start: String,
        type: String,
        student: String,
        teacher: String,
      },
      { timestamps: true }
    )
  );

  return Lesson;
};
