const express = require('express')
require('dotenv').config()
const transporter = require('./sendEmail.js')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

app.post('/register', (req, res) => {
    const email = req.body.email

    const mailOptions = {
        from:'your_email',
        to: email,
        subject: 'Test Email',
        text: 'This is a test email'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log('An error occured:', error )
        } else {
            console.log('Email sent:', info.response)
        }
    })

    res.status(200).json({
        message: 'All gut'
    })

})
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})