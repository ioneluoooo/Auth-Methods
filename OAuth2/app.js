const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./passport.js')
const authRouter = require('./routes.js');

const app = express();

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
