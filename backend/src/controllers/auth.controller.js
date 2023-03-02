const schema = require('../validation/auth.validation');
const handleError = require('../utils/error.util');
const { User, Admin } = require('../models');

const login = async (req, res, next) => {
  const { username, password, type } = req.body;
  try {

    const user = type === 'user' ? await User.findOne({ username }) : await Admin.findOne({ username });

    if (!user) return handleError(res, 'usuário não existe', 401, type);

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      return handleError(res, 'senha invalida', 401, type);
    }

    // compare password
    const token = user.createJWT()
    return res.status(200).json({ 
      success: true, 
      username: user.username, 
      token, 
      role: type, 
      message: 'usuario logado com sucesso',
    });

  } catch (err) {
    console.log(err);
    return handleError(res, 'algo deu errado', 500);
  }
};

const register = async (req, res, next) => {
  const request = req.body;

  const { username, password, type } = req.body;

  try {
    const userExists = type === 'user' ? await User.exists({ username }) : await Admin.exists({ username });

    if (!userExists) {
      const user = type === 'user' ? await User.create({ ...request }) : await Admin.create({ ...request });
      const token = user.createJWT();
      return res.status(201).json({ success: true, message: 'usuário criado com sucesso', token });
    }
    else return handleError(res, 'usuário já existe', 400, type);

  } catch (err) {
    console.log(err);
    return handleError(res, 'algo deu errado', 500);
  }
};

const getUser = async (req, res) => {
  try {

    const response = req.user.role === 'user' ? await User.findOne({_id: req.user.userId}) : await Admin.findOne({ _id: req.user.userId });

    const { username } = response;

    return res.status(201).json({
      username,
      role: req.user.role,
      success: true,
      message: 'usuário re-logado com sucesso'
    });

  } catch (error) {
    console.log(error);
    return handleError(res, 'algo deu errado', 500);
  }
};

module.exports = { login, register, getUser };