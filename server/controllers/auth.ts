import { passport } from 'passport'
import validator from 'validator'
import User from '../models/User'

export default {
  getLogin: (req: any, res: any) => {
    //if user is logged in, redirects them to todos, otherwise redirects to login
    if (req.user) {
      return res.json({ userName: req.user.userName, email: req.user.email, password: req.user.password })
    }
    return res.json({ message: 'Not logged in.' })
  },

  postLogin: (req: any, res: any, next: any) => {
    console.log(req.body);
    //uses package 'validator' to do password validation
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
    //if validation error is thrown, display error and redirect to signup
    if (validationErrors.length) {
      return res.json({ message: 'Validation failed.' })
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
    //uses 'local' strategy from passport
    //securely matches input password to hash stored in database
    passport.authenticate('local', (err: any, user: any) => {
      if (err) { return next(err) }
      if (!user) {
        return res.json({ message: 'Authentication failed.' })
      }
      req.logIn(user, (err: any) => {
        if (err) { return next(err) }
        return res.json({ userName: req.user.userName, email: req.user.email, password: req.user.password })
      })
    })(req, res, next)
  },

  //on clicking the logout button, logs user out and destroys their session
  logout: (req: any, res: any) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err: any) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      return res.json({ message: 'Logout successful.' })
    })
  },

  //when user clicks the 'signup' button, redirects them to todos page if they're logged in already
  //otherwise redirects them to 'signup' page
  getSignup: (req: any, res: any) => {
    if (req.user) {
      return res.json({ message: 'You are already logged in!' })
    }
    res.render('signup', {
      title: 'Create Account'
    })
  },

  postSignup: (req: any, res: any, next: any) => {
    //uses package 'validator' to do password validation
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
    //if validation error is thrown, display error and redirect to signup
    if (validationErrors.length) {
      return res.json({ test: validationErrors })
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
    User.findOne({
      $or: [
        { email: req.body.email },
        { userName: req.body.userName }
      ]
    }, (err: any, existingUser: any) => {
      if (err) { return next(err) }
      if (existingUser) {
        return res.json({ message: 'Account with that email address or username already exists.' })
      }
      user.save((err: any) => {
        if (err) { return next(err) }
        req.logIn(user, (err: any) => {
          if (err) {
            return next(err)
          }
        })
        return res.json({ message: 'Account successfully created.' })
      })
    })
  }
}