import "dotenv/config"
import express from 'express'
import path from 'path';
import passport from 'passport'
import session from 'express-session'
import logger from 'morgan'
import MongoStore from 'connect-mongo'
import connectDB from './config/database';
import mainRoutes from './routes/main';
import poemRoutes from './routes/poems';
import commentRoutes from './routes/comments';
import passportConfig from './config/passport';

const app = express()
passportConfig(passport)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
)

// Render React as View
app.use(express.static(path.join(__dirname, "..", "client", "build")));

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set Up Routes
app.use('/', mainRoutes)
app.use('/poems', poemRoutes)
app.use('/comments', commentRoutes)
app.get("'", (_: any, res: any) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
})

connectDB().then(() => {
  //Server Running
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running on ${process.env.PORT}, you better catch it!`
    );
  });
});