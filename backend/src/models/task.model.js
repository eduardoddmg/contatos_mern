const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Credenciais inválidas'],
    },
    status: {
      type: String,
      enum: ['start', 'proccess', 'finish'],
      default: 'start',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Credenciais inválidas'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Tasks', TaskSchema)
