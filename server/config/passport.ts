import User from '../models/User'
import Passport from 'passport-local'
const LocalStrategy = Passport.Strategy

export default function passportConfig(passport: any) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email: string, password: string, done: any) => {
    User.findOne({ email: email.toLowerCase() }, (err: any, user: any) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` })
      }
      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      }
      user.comparePassword(password, (err: any, isMatch: boolean) => {
        if (err) { return done(err) }
        if (isMatch) {
          return done(null, user)
        }
        return done(null, false, { msg: 'Invalid email or password.' })
      })
    })
  }))


  passport.serializeUser((user: any, done: any) => {
    done(null, user.id)
  })

  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: any, user: any) => done(err, user))
  })
}
