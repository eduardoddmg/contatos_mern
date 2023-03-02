const auth = require('./auth.middleware');
const permit = require('./permit.middleware');

module.exports = { auth, permit };