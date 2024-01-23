const express = require('express')
const passport = require('passport')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>')
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/')
    }
)

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
})

module.exports = router