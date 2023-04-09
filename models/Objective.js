const mongoose = require('mongoose')

const objectiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  target: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

const Objective = mongoose.model('Objective', objectiveSchema)

module.exports = Objective
