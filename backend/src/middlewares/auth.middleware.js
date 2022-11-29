const { User } = require('../models')
const jwt = require('jsonwebtoken')
const handleError = require('../utils/error.util');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return handleError(res, 'Credentials invalid', 401)
  }

  const token = authHeader;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload)
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    return handleError(res, 'Authentication invalid', 401)
  }
}

module.exports = auth
