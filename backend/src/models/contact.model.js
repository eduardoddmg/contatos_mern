const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide  name'],
      maxlength: [50, '50 max [name]'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
    },
    CPF: {
      type: String,
    },
    RG: {
      type: String,
    },
    tel: {
      type: String,
    },
    status: {
      type: String,
      enum: ['friend', 'love', 'enemy'],
      default: 'friend',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Contact', ContactSchema)
