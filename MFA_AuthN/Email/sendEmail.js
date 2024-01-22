const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email',
        pass: 'your_password'
        // if your acc has 2-factor authentification
        // then generate an app password in your google account
        // and put it here
        // else, just write your normal password
    }
})

module.exports = transporter