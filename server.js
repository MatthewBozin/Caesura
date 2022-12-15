const express = require('express')
const path = require('path');
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const poemRoutes = require('./routes/poems')
const commentRoutes = require('./routes/comments');

require('dotenv').config({path: './config/.env'})
require('./config/passport')(passport)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set Up Routes
app.use('/', mainRoutes)
app.use('/poems', poemRoutes)
app.use('/comments', commentRoutes)
app.get("'", (_, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})
 
connectDB().then(() => {
  //Server Running
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running on ${process.env.PORT}, you better catch it!`
    );
  });
});