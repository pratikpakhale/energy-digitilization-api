const Objective = require('../models/Objective')
const express = require('express')
const router = express.Router()
// GET all objectives
const getObjectives = async (req, res) => {
  try {
    const objectives = await Objective.find()
    res.json(objectives)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET a specific objective by ID
const getObjectiveById = async (req, res) => {
  try {
    const objective = await Objective.findById(req.params.id)
    if (!objective) {
      return res.status(404).json({ message: 'Objective not found' })
    }
    res.json(objective)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST a new objective
const createObjective = async (req, res) => {
  const objective = new Objective(req.body)
  try {
    const newObjective = await objective.save()
    res.status(201).json(newObjective)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// PUT/update a specific objective by ID
const updateObjective = async (req, res) => {
  try {
    const objective = await Objective.findById(req.params.id)
    if (!objective) {
      return res.status(404).json({ message: 'Objective not found' })
    }
    objective.name = req.body.name
    objective.description = req.body.description
    objective.target = req.body.target
    objective.unit = req.body.unit
    objective.category = req.body.category
    objective.deadline = req.body.deadline
    const updatedObjective = await objective.save()
    res.json(updatedObjective)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// DELETE a specific objective by ID
const deleteObjective = async (req, res) => {
  try {
    const objective = await Objective.findById(req.params.id)
    if (!objective) {
      return res.status(404).json({ message: 'Objective not found' })
    }
    await objective.remove()
    res.json({ message: 'Objective deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getObjectives,
  getObjectiveById,
  createObjective,
  updateObjective,
  deleteObjective,
}

// GET all objectives
router.get('/', this.getObjectives)

// GET a specific objective by ID
router.get('/:id', this.getObjectiveById)

// POST a new objective
router.post('/', this.createObjective)

// PUT/update a specific objective by ID
router.put('/:id', this.updateObjective)

// DELETE a specific objective by ID
router.delete('/:id', this.deleteObjective)

module.exports = router
