const express = require('express')

const router = express.Router()

const {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
  getContact,
} = require('../controllers/contact.controller');

const { auth } = require('../middlewares');

router.use(auth);

router.route('/').post(createContact).get(getAllContacts)

router.route('/:id').get(getContact).delete(deleteContact).patch(updateContact)

module.exports = router