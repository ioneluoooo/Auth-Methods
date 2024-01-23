const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
    new GoogleStrategy(
        {
            clientID: 'YOUR_CLIENT_ID',
            clientSecret: 'YOUR_CLIENT_SECRET',
            callbackURL: 'YOUR_CALLBACK_URL'
            // create a new project in google developer console
            // then create OAuth credentials
            // configure the screen and then get the keys
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile)
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})