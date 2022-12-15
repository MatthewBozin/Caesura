const mongoose = require('mongoose')

const PoemDataSchema = new mongoose.Schema({
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

module.exports = mongoose.model('PoemData', PoemDataSchema)
