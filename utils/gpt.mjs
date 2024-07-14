const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Route to trigger MPESA transaction
app.post('/mpesa', async (req, res) => {
  try {
    const token = await getAccessToken()
    const response = await initiateSTKPush(
      token,
      req.body.amount,
      req.body.phone
    )
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

async function getAccessToken() {
  const url =
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64')

  const response = await axios.get(url, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })

  return response.data.access_token
}

async function initiateSTKPush(token, amount, phone) {
  const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14)
  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString('base64')

  const data = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: 'CompanyXLTD',
    TransactionDesc: 'Payment for services',
  }

  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
