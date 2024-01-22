const express = require('express')
const bodyParser = require('body-parser')
const twilio = require('twilio')
require('dotenv').config()

const app = express()
const port = 3000

// Twilio credential
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const twilioNumber = process.env.TWILIO_NUMBER

const client = twilio(accountSid, authToken)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.post('/register', (req, res) => {
    const { phoneNumber } = req.body

    //Generate a random 6-digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    client.messages
    .create({
        body: `Your verification code is ${verificationCode}`,
        from: twilioNumber,
        to: phoneNumber,
    })
    .then((message) => {
        console.log(`Verification code send ${message.sid}`)
        res.send('Verification code sent. Check your phone')
    })
    .catch((err) => {
        console.log(`Error sending verification code: ${err.message}`)
        res.status(500).send('Error sending verification code, try later')
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})