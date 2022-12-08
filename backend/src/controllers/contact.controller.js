const { Contact } = require('../models');
const handleError = require('../utils/error.util');

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ createdBy: req.user.userId }).sort('createdAt')
    return res.status(200).json({ success: true, contacts, count: contacts.length })
  } catch (err) {
    return handleError(res, err, 500);    
  }
}
const getContact = async (req, res) => {
  try {
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
  } catch (err) {
    return handleError(res, err, 500);    
  }
}

const createContact = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId
    const contact = await Contact.create(req.body)
    return res.status(200).json({ success: true, contact })
  } catch (err) {
    return handleError(res, err, 500);
  }
}

const updateContact = async (req, res) => {
  try {
    const {
      body: { name, email },
      user: { userId },
      params: { id: contactId },
    } = req

    if (name === '' || email === '') {
      return handleError(res, 'Name or Email fields cannot be empty', 400);
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
  } catch (err) {
     return handleError(res, err, 500);
  }
}

const deleteContact = async (req, res) => {
  try {
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
  } catch (err) {
    return handleError(res, err, 500);
  }
}

module.exports = {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
  getContact,
}