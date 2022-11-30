const { Contact } = require('../models');
const handleError = require('../utils/error.util');

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find({ createdBy: req.user.userId }).sort('createdAt')
  return res.status(200).json({ success: true, contacts, count: contacts.length })
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
  if (!contact) {
    return handleError(res, `No contact with id ${contactId}`, 400);
  }
  return res.status(200).json({ success: true, contact })
}

const createContact = async (req, res) => {
  req.body.createdBy = req.user.userId
  const contact = await Contact.create(req.body)
  return res.status(200).json({ success: true, contact })
}

const updateContact = async (req, res) => {
  const {
    body: { name, email },
    user: { userId },
    params: { id: contactId },
  } = req

  if (name === '' || email === '') {
    return handleError(res, 'Company or Position fields cannot be empty', 400);
  }
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!contact) {
    return handleError(res, `No contact with id ${contactId}`, 400);
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
    return handleError(res, `No contact with id ${contactId}`, 400);
  }
  return res.status(200).json({ success: true, message: 'contato deletado com sucesso!'})
}

module.exports = {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
  getContact,
}