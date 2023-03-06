const { Task } = require('../models');
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllTasks = async (req, res) => {
    const tasks = await Task
      .find({ createdBy: req.user.userId })
      .sort('createdAt')
    return res
      .status(StatusCodes.OK)
      .json({ success: true, tasks, count: tasks.length });
}
const getTask = async (req, res) => {
    const {
      user: { userId },
      params: { id: taskId },
    } = req

    const task = await Task.findOne({
      _id: taskId,
      createdBy: userId,
    })
    if (!task) 
      throw new CustomError.NotFoundError("Tarefa não encontrada");

    return res.status(StatusCodes.OK).json({ success: true, task })
}

const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId
    const task = await Task.create(req.body)
    return res.status(StatusCodes.OK).json({ success: true, task })
}

const updateTask = async (req, res) => {
    const {
      body: { name, email },
      user: { userId },
      params: { id: taskId },
    } = req

    if (name === '' || email === '') {
      throw new CustomError.BadRequestError("Credenciais inválidas")
    }
    const task = await Task.findByIdAndUpdate(
      { _id: taskId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!task) {
      throw new CustomError.NotFoundError("Tarefa não encontrada")
    }
    return res.status(201).json({ success: true, task })
}

const deleteTask = async (req, res) => {
    const {
      user: { userId },
      params: { id: taskId },
    } = req

    const task = await Task.findByIdAndRemove({
      _id: taskId,
      createdBy: userId,
    })
    if (!task) {
      throw new CustomError.NotFoundError("Credenciais inválidas");
    }
    
    return res.status(StatusCodes.OK).json({ success: true, message: 'Tarefa deletada com sucesso!'})
}

module.exports = {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  getTask,
};