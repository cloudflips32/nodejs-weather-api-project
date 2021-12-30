const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const errorHandler = require('./middleware/error')

const PORT = process.env.PORT || 5000

const app = express()

// Rate Limit
const limiter = rateLimit({
  windowMs: 10*60*1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
})
app.use(limiter)
app.set('trust proxy', 1)

// Enable CORS
app.use(cors())

// Setting Static Folder
app.use(express.static('public'))

// To Routes
app.use('/api', require('./routes'))

// Mount Error Handler Middleware
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))