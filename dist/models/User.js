"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const UserSchema = new mongoose_1.Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});
// Password hash middleware.
UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    (0, bcrypt_1.genSalt)(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        (0, bcrypt_1.hash)(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    (0, bcrypt_1.compare)(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
module.exports = mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map