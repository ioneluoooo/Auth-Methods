const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(express.json())

const users = [
    { id: 1, username: 'john', password: '123456' },
    { id: 2, username: 'igor', password: '12345678' },
    { id: 3, username: 'oompa loompa', password: '1234567' }
]

// Session data (in-memory storage)
// Consider using a database in a real app
const sessions = {}

app.post('/login', (req, res) => {
    const { username, password } = req.body

    const user = users.find(u => u.username === username && u.password === password)

    if(user) {
        
        // Generate a unique session ID
        const sessionId = Math.random().toString(36).substring(2)

        // Store the session ID on the server
        sessions[sessionId] = {userId: user.id}

        // Setting a cookie
        res.cookie('sessionId', sessionId, {httpOnly: true})

        res.send('Login successful')
    } else {
        res.status(401).send('Invalid credentials')
    }
})

app.get('/profile', (req, res) => {

    //Check if the user is authentificated
    const sessiodId = req.cookies.sessionId
    const session = sessions[sessiodId]

    if(session) {
        // User is authentificated

        const userId = session.userId
        const user = users.find(u => u.id === userId)

        res.send(`Welcome , ${user.username}`)
    } else {
        res.status(401).send('Not authentificated')
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})