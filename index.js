require('dotenv').config()
const express = require('express')
const cors = require('cors')
const ngrok = require('@ngrok/ngrok')
const app = express()
const payment = require('./routes/transaction-route')

//middleware
app.use(cors())

//routes
app.use('/pay', payment)

//test route
app.get('/', (req, res) => {
  res.status(200).send('<h1>service is on</h1>')
})

app.listen(process.env.PORT || 3000, () =>
  console.log(`service is running on port ${process.env.PORT || 3000}`)
)

// ngrok.forward({ addr: 3000, authtoken: process.env.AUTH }).then((listener) => {
//   console.log(`Ingress established at: ${listener.url()}`)
// })
