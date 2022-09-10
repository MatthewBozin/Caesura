const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

  exports.getLogin = (req, res) => {
    //if user is logged in, redirects them to todos, otherwise redirects to login
    if (req.user) {
      return 
    }
    res.render('login', {
      title: 'Login'
    })
  }

  exports.test = (req, res) => {
    res.json({test: "test"})
  }
  
  exports.postLogin = (req, res, next) => {
    console.log(req.body);
    //uses package 'validator' to do password validation
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
    //if validation error is thrown, display error and redirect to signup
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false }) 
    //uses 'local' strategy from passport
    //securely matches input password to hash stored in database
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
      })
    })(req, res, next)
  }
  
  //on clicking the logout button, logs user out and destroys their session
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
    })
  }
  
  //when user clicks the 'signup' button, redirects them to todos page if they're logged in already
  //otherwise redirects them to 'signup' page
  exports.getSignup = (req, res) => {
    if (req.user) {
      return
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    //uses package 'validator' to do password validation
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
    //if validation error is thrown, display error and redirect to signup
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.json({test: validationErrors})
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      chef: req.body.chef
    })
    
    //sends a findOne request to the User model
    //User model searches database for accounts with matching email address or username
    //If it finds one, returns error and redirects back to signup
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.json({message: 'Account with that email address or username already exists.'})
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
        })
        return res.json({message: 'Account successfully created.'})
      })
    })
  }