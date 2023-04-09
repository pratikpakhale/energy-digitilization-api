const mongoose = require('mongoose')

const powerPlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  digitalTwin: {
    type: Boolean,
    default: false,
  },
  connectedGrids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grid',
    },
  ],
  objectives: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Objective',
    },
  ],
  assets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

const PowerPlant = mongoose.model('PowerPlant', powerPlantSchema)

module.exports = PowerPlant
