const schema = require('../validation/auth.validation');
const handleError = require('../utils/error.util');
const { Admin, User, Contact } = require('../models');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send({
      success: true,
      users
    });
  } catch (error) {
    console.log(error);
    return handleError(res, 'algo deu errado', 500);
  }
};

const getContentOfUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const contacts = await Contact.find({
      createdBy: userId,
    });

    const user = await User.findOne({ _id: userId });

    return res.status(200).send({
      success: true,
      contacts,
      user
    });

  } catch (error) {
    console.log(error);
    return handleError(res, 'algo deu errado', 500);
  }
};

module.exports = { getUsers, getContentOfUser };