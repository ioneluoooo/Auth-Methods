const express = require('express')
const isAuthentificated = require('./middleware.js')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json())

const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true
    })
)

// Mock user data 
const users = [
    { id: 1, username: 'john', password: '123456' },
    { id: 2, username: 'igor', password: '12345678' },
    { id: 3, username: 'oompa loompa', password: '1234567' }
]

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password match
    const user = users.find(u => u.username === username && u.password === password)

    if (user) {
        // Store the user ID in the session
        req.session.userId = user.id

        res.send('Login successful')
    } else {
        res.status(401).send('Invalid credentials')
    }
})

// Protected route

app.get('/profile', isAuthentificated, (req, res) => {
    const userId = req.session.userId
    const user = users.find(u => u.id === userId)

    res.send(`Welcome, ${user.username}`)
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Error destroying the session', err)
        } else {
            res.redirect('/')
            // will get " Cannot GET / "
        }
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
