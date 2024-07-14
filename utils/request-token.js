const axios = require('axios')

const requestAuth = async () => {
  let url =
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64')
  try {
    let token = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })
    return token.data
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = { requestAuth }
