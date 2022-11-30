const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide  name'],
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      maxlength: 100,
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
