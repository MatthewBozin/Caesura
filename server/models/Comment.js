const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  lines: {
    type: Array,
    required: true,
  },
  authors: {
    type: Array,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  snaps: {
    type: Array,
    required: true
  },
  poem: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);