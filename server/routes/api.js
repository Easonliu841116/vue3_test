const express = require('express')
const router = express.Router()
const delay = require('delay')

router.get('/test', async (req, res) => {
  res.json({
    test: 'test'
  })
})

module.exports = router