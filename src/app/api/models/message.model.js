const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: [String],
    },
    type: {
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

mongoose.model("Message", messageSchema);
