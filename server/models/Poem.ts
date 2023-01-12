import { Schema, model } from 'mongoose'

const PoemSchema: Schema = new Schema({
  lines: {
    type: Array,
    required: true,
  },
  authors: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
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
  comments: {
    type: Number,
    required: true
  }
})

const Poem = model('Poem', PoemSchema)

export default Poem
