const permit = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) return res
      .status(401)
      .send({ 
        message: 'Não autorizado', success: false
      });
    else next();
  }
};

module.exports = permit;
