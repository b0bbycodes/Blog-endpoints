const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a blog title"],
    },
    desc: {
      type: String,
      required: [true, "Please provide a description"],
    },
    tag: {
      type: String,
      enum: ["Nature", "Lifestyle", "Sports", "Technology"],
    },
    createdby: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a writer"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);