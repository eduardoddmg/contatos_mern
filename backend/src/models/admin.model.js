const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    maxlength: [30, '5-30 char [username]'],
    minlength: [5, '5-30 char [username]'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    maxlength: [30, '5-30 char [username]'],
    minlength: [5, '5-30 char [username]'],
  },
})

AdminSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
});

AdminSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username, role: 'admin' },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
};

AdminSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('Admin', AdminSchema)