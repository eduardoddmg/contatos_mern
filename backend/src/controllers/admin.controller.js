const schema = require('../validation/auth.validation');
const { Admin, User, Contact } = require('../models');

const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getUsers = async (req, res) => {
    const users = await User.find({});
    return res.status(StatusCodes.OK).send({
      success: true,
      users
    });
};

const getContentOfUser = async (req, res) => {
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
};

module.exports = { getUsers, getContentOfUser };