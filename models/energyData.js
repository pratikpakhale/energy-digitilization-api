const mongoose = require('mongoose')

const energyDataSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
  },
  data: {
    type: Map,
    of: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

const EnergyData = mongoose.model('EnergyData', energyDataSchema)

module.exports = EnergyData
