import { Schema } from 'mongoose'
import { hash, genSalt, compare } from 'bcrypt'

const UserSchema: any = new Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
})

// Password hash middleware.
UserSchema.pre('save', function save(next: any) {
  const user = this
  if (!user.isModified('password')) { return next() }
  genSalt(10, (err: any, salt: string) => {
    if (err) { return next(err) }
    hash(user.password, salt, (err: any, hash: string) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword: string, cb: any) {
  compare(candidatePassword, this.password, (err: any, isMatch: any) => {
    cb(err, isMatch)
  })
}

const User = mongoose.model('User', UserSchema)

export default User
