const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const colors = require('colors')
const apicache = require('apicache')

// Declare Environment Variables
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Initiate API Cache
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async (req,res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    })

    const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
    const data = apiRes.body

    // Logs request to Weather API
    if(process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`)
    }

    res.status(200).json(data).green
  } catch (error) {
    next(error)
  }
})

module.exports = router