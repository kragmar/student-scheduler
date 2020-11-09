const mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
  studentId: {
    type: String,
    required: true,
  },
});

mongoose.model("Image", imageSchema);
