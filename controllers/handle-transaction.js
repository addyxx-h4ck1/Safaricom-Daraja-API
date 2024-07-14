const { requestAuth } = require('../utils/request-token')
const { sendTransaction } = require('../utils/send-transaction')

const handleTransaction = async (req, res) => {
  try {
    let token = await requestAuth()
    if (!token.access_token) throw new Error('There was an error')
    let resp = await sendTransaction(token.access_token, 1, 254768299380)
    console.log(resp)
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

module.exports = { handleTransaction }
