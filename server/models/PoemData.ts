import { Schema, model } from 'mongoose'

const PoemDataSchema: Schema = new Schema({
  lines: {
    type: Array,
    required: true,
  },
  author: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
})

const PoemData = model('PoemData', PoemDataSchema)

export default PoemData
