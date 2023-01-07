import { Schema } from "mongoose";

const CommentSchema: Schema = new Schema({
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

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment