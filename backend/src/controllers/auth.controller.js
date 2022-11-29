const schema = require('../validation/auth.validation');
const handleError = require('../utils/error.util');
const { User } = require('../models');

const postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validate = await schema.validateAsync({ username, password });

    const user = await User.findOne({ username });

    if (!user) return handleError(res, 'usuário não existe', 401);
  } catch (err) {
    console.log(err);

    return handleError(res, 'algo deu errado', 500);
  }
};

const postRegister = async (req, res, next) => {
  const request = req.body;

  const { username, password } = req.body;
  
  try {
    const validate = await schema.validateAsync(request);

    const userExists = await User.exists({ username })
    
    if (!userExists) {
      const user = await User.create({...request});
      const token = user.createJWT();
      res.status(201).json({ success: true, message: 'usuário criado com sucesso', token});
    }
    else return handleError(res, 'usuário já existe', 400);
  } catch (err) {
    console.log(err);
    return handleError(res, 'algo deu errado', 500);
  }
};

module.exports = { postLogin, postRegister };