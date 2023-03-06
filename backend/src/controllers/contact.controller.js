const { Contact } = require('../models');
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllContacts = async (req, res) => {
    const contacts = await Contact
      .find({ createdBy: req.user.userId })
      .sort('createdAt')
    return res
      .status(StatusCodes.OK)
      .json({ success: true, contacts, count: contacts.length });
}
const getContact = async (req, res) => {
    const {
      user: { userId },
      params: { id: contactId },
    } = req

    const contact = await Contact.findOne({
      _id: contactId,
      createdBy: userId,
    })
    if (!contact) 
      throw new CustomError.NotFoundError("Contato não encontrado");

    return res.status(StatusCodes.OK).json({ success: true, contact })
}

const createContact = async (req, res) => {
    req.body.createdBy = req.user.userId
    const contact = await Contact.create(req.body)
    return res.status(StatusCodes.OK).json({ success: true, contact })
}

const updateContact = async (req, res) => {
    const {
      body: { name, email },
      user: { userId },
      params: { id: contactId },
    } = req

    if (name === '' || email === '') {
      throw new CustomError.BadRequestError("Credenciais inválidas")
    }
    const contact = await Contact.findByIdAndUpdate(
      { _id: contactId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!contact) {
      throw new CustomError.NotFoundError("Contato não encontrado")
    }
    return res.status(201).json({ success: true, contact })
}

const deleteContact = async (req, res) => {
    const {
      user: { userId },
      params: { id: contactId },
    } = req

    const contact = await Contact.findByIdAndRemove({
      _id: contactId,
      createdBy: userId,
    })
    if (!contact) {
      throw new CustomError.NotFoundError("Credenciais inválidas");
    }

    return res.status(StatusCodes.OK).json({ success: true, message: 'contato deletado com sucesso!'})
}

module.exports = {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
  getContact,
};