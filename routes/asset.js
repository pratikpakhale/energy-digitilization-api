const Asset = require('../models/Asset')
const express = require('express')
const router = express.Router()

// Create a new asset
exports.createAsset = async (req, res) => {
  try {
    const { name, type, location, status, lastServiceDate } = req.body
    const newAsset = new Asset({
      name,
      type,
      location,
      status,
      lastServiceDate,
    })
    await newAsset.save()
    res.status(201).json(newAsset)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find()
    res.json(assets)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get a single asset
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id)
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' })
    }
    res.json(asset)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update an asset
exports.updateAsset = async (req, res) => {
  try {
    const { name, type, location, status, lastServiceDate } = req.body
    const updatedAsset = {
      name,
      type,
      location,
      status,
      lastServiceDate,
    }
    const asset = await Asset.findByIdAndUpdate(req.params.id, updatedAsset, {
      new: true,
    })
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' })
    }
    res.json(asset)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete an asset
exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id)
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' })
    }
    res.json({ message: 'Asset deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new asset
router.post('/', this.createAsset)

// Get all assets
router.get('/', this.getAllAssets)

// Get a single asset
router.get('/:id', this.getAssetById)

// Update an asset
router.put('/:id', this.updateAsset)

// Delete an asset
router.delete('/:id', this.deleteAsset)

module.exports = router
