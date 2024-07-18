require('dotenv').config()
const express = require('express')
const cors = require('cors')
const ngrok = require('@ngrok/ngrok')
const app = express()
const payment = require('./routes/transaction-route')
const callback = require('./routes/callback')

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/pay', payment)
app.use('/callback', callback)

//test route
app.get('/', (req, res) => {
  res.status(200).json({ ok: true })
})

app.listen(process.env.PORT || 3000, () =>
  console.log(`service is running on port ${process.env.PORT || 3000}`)
)

// ngrok.forward({ addr: 3000, authtoken: process.env.AUTH }).then((listener) => {
//   console.log(`Ingress established at: ${listener.url()}`)
// })
