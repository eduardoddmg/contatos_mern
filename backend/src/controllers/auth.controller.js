const schema = require('../validation/auth.validation');
const { User, Admin } = require('../models');

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const login = async (req, res, next) => {
  const { username, password, type } = req.body;

    const user = type === 'user' ? await User.findOne({ username }) : await Admin.findOne({ username });

    if (!user)
      throw new CustomError.UnauthenticatedError("Usuário não existe");

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError("Senha incorreta");
    }

    const token = user.createJWT();

    return res.status(StatusCodes.OK).json({ 
      success: true, 
      username: user.username, 
      token, 
      role: type, 
      message: 'usuario logado com sucesso',
    });
};

const register = async (req, res, next) => {
  const request = req.body;

  const { username, password, type } = req.body;

  const userExists = type === 'user' ? await User.exists({ username }) : await Admin.exists({ username });

  if (userExists)
      throw new CustomError.UnauthenticatedError("Usuário já existe")

  const user = type === 'user' ? await User.create({ ...request }) : await Admin.create({ ...request });
  const token = user.createJWT();
  return res.status(201).json({ success: true, message: 'usuário criado com sucesso', token });
};

const getUser = async (req, res) => {
    const response = req.user.role === 'user' ? await User.findOne({_id: req.user.userId}) : await Admin.findOne({ _id: req.user.userId });

    const { username } = response;

    return res.status(StatusCodes.OK).json({
      username,
      role: req.user.role,
      success: true,
      message: 'usuário re-logado com sucesso'
    });
};

module.exports = { login, register, getUser };