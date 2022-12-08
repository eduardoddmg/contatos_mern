const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    maxlength: [15, '8-15 char [username]'],
    minlength: [8, '8-15 char [username]'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    maxlength: [15, '8-15 char [username]'],
    minlength: [8, '8-15 char [username]'],
  },
})

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)