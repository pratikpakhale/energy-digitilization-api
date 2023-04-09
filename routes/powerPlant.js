// Import the required modules
const express = require('express')
const router = express.Router()
const PowerPlant = require('../models/powerPlant')

// Route to create a new power plant
router.post('/', async (req, res) => {
  try {
    const powerPlant = new PowerPlant(req.body)
    await powerPlant.save()
    res.status(201).json(powerPlant)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Route to get all power plants
router.get('/', async (req, res) => {
  try {
    const powerPlants = await PowerPlant.find()
    res.json(powerPlants)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Route to get a specific power plant by ID
router.get('/:id', getPowerPlant, (req, res) => {
  res.json(res.powerPlant)
})

// Route to update a power plant
router.patch('/:id', getPowerPlant, async (req, res) => {
  if (req.body.name != null) {
    res.powerPlant.name = req.body.name
  }
  if (req.body.location != null) {
    res.powerPlant.location = req.body.location
  }
  if (req.body.capacity != null) {
    res.powerPlant.capacity = req.body.capacity
  }
  if (req.body.owner != null) {
    res.powerPlant.owner = req.body.owner
  }
  try {
    const updatedPowerPlant = await res.powerPlant.save()
    res.json(updatedPowerPlant)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Route to delete a power plant
router.delete('/:id', getPowerPlant, async (req, res) => {
  try {
    await res.powerPlant.remove()
    res.json({ message: 'Power plant deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware function to get a specific power plant by ID
async function getPowerPlant(req, res, next) {
  try {
    const powerPlant = await PowerPlant.findById(req.params.id)
    if (powerPlant == null) {
      return res.status(404).json({ message: 'Cannot find power plant' })
    }
    res.powerPlant = powerPlant
    next()
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = router
