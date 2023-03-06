const auth = require('./auth.middleware');
const permit = require('./permit.middleware');
const errorHandler = require('./error-handler.middleware');
const notFound = require('./not-found.middleware');

module.exports = { auth, permit, errorHandler, notFound };