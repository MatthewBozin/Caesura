const mongoose = require('mongoose')

const PoemSchema = new mongoose.Schema({
  poem: {
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
  date:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Poem', PoemSchema)
