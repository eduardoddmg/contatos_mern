const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Credenciais inválidas'],
      maxlength: [50, 'Tamanho inválido'],
    },
    email: {
      type: String,
      required: [true, 'Credenciais inválidas'],
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
      required: [true, 'Credenciais inválidas'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Contact', ContactSchema)
