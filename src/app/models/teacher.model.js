module.exports = (mongoose) => {
  const Teacher = mongoose.model(
    "teacher",
    mongoose.Schema(
      {
        name: String,
      },
      { timestamps: true }
    )
  );

  return Teacher;
};
