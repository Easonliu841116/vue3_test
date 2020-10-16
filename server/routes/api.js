import express from 'express'
import delay from 'delay'

const router = express.Router()

router.get('/test', async (req, res) => {
  res.json({
    test: 'test'
  })
})

// export 不能用 ES6 ??
module.exports = router