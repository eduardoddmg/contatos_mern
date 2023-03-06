const { User } = require('../models')
const jwt = require('jsonwebtoken')
const handleError = require('../utils/error.util');

const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new CustomError.UnauthorizedError("Autenticação inválida");
  }

  const token = authHeader;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    req.user = { 
      role: payload.role, 
      userId: payload.userId, 
      name: payload.name 
    };
      
    next();
  } catch (error) {
    throw new CustomError.UnauthorizedError("Autenticação inválida")
  }
}

module.exports = auth
