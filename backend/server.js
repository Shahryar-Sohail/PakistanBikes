import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.send('<h1>Express.Js Runnig  ✅</h1>')
})

// Bikes route without model
app.get('/bikes', async (req, res) => {
  try {
    const bikes = await mongoose.connection.db.collection('bikes').find().toArray()
    res.json(bikes)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch bikes' })
  }
})

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected ✅')
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch(err => console.error('❌ MongoDB Error:', err))
