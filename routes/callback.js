const { handleCallback } = require('../controllers/handle-transaction')

const router = require('express').Router()

router.post('/', handleCallback)

module.exports = router
