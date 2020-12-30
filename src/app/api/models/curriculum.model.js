const mongoose = require("mongoose");

const curriculumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
    desc: String,
    group: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model("Curriculum", curriculumSchema);
