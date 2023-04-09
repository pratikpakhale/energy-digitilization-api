// energyData.controller.js
const express = require('express')
const router = express.Router()
const EnergyData = require('../models/energyData')

// create a new energy data record
const createEnergyData = async (req, res) => {
  try {
    const energyData = new EnergyData(req.body)
    await energyData.save()
    res.status(201).send(energyData)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

// get all energy data records
const getAllEnergyData = async (req, res) => {
  try {
    const energyData = await EnergyData.find({})
    res.send(energyData)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// get energy data record by ID
const getEnergyDataById = async (req, res) => {
  try {
    const energyData = await EnergyData.findById(req.params.id)
    if (!energyData) {
      return res.status(404).send('Energy data record not found')
    }
    res.send(energyData)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// update energy data record by ID
const updateEnergyData = async (req, res) => {
  try {
    const energyData = await EnergyData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!energyData) {
      return res.status(404).send('Energy data record not found')
    }
    res.send(energyData)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

// delete energy data record by ID
const deleteEnergyData = async (req, res) => {
  try {
    const energyData = await EnergyData.findByIdAndDelete(req.params.id)
    if (!energyData) {
      return res.status(404).send('Energy data record not found')
    }
    res.send('Energy data record deleted successfully')
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = {
  createEnergyData,
  getAllEnergyData,
  getEnergyDataById,
  updateEnergyData,
  deleteEnergyData,
}

// create a new energy data record
router.post('/', this.createEnergyData)

// get all energy data records
router.get('/', this.getAllEnergyData)

// get energy data record by ID
router.get('/:id', this.getEnergyDataById)

// update energy data record by ID
router.put('/:id', this.updateEnergyData)

// delete energy data record by ID
router.delete('/:id', this.deleteEnergyData)

module.exports = router
