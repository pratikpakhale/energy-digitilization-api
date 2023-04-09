const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/login', async function login(req, res) {
  const { email, password } = req.body

  // Check if user with given email exists
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  // Check if password is correct
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.json({ token })
})

// Create User
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    user = new User({
      name,
      email,
      password,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// Get User by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (err) {
    console.error(err.message)

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(500).send('Server Error')
  }
})

// Update User
router.put('/:userId', async (req, res) => {
  try {
    const { name, email, password } = req.body
    let user = await User.findById(req.params.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.name = name || user.name
    user.email = email || user.email

    if (password) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
    }

    await user.save()

    res.json(user)
  } catch (err) {
    console.error(err.message)

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(500).send('Server Error')
  }
})

// Delete User
router.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.remove()

    res.json({ message: 'User removed' })
  } catch (err) {
    console.error(err.message)

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(500).send('Server Error')
  }
})

module.exports = router
