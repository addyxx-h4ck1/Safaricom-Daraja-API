const { handleTransaction } = require('../controllers/handle-transaction')

const router = require('express').Router()

router.post('/', handleTransaction)

module.exports = router
