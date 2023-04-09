const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// Import routes
const userRoutes = require('./routes/user')
const assetRoutes = require('./routes/asset')
const energyDataRoutes = require('./routes/energyData')
const objectiveRoutes = require('./routes/objective')
const powerPlantRoutes = require('./routes/powerPlant')

// Create express app
const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Connect to MongoDB database
mongoose
  .connect('mongodb://0.0.0.0:27017/energyApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed!')
  })

// Use routes
app.use('/api/users', userRoutes)
app.use('/api/assets', assetRoutes)
app.use('/api/energydata', energyDataRoutes)
app.use('/api/objectives', objectiveRoutes)
app.use('/api/powerplants', powerPlantRoutes)

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000!')
})
