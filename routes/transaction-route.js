const {
  handleTransaction,
  handleCallback,
} = require('../controllers/handle-transaction')

const router = require('express').Router()

router.post('/', handleTransaction)
router.post('/callback', handleCallback)

module.exports = router
