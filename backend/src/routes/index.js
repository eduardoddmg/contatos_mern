const authRoutes = require('./auth.routes');
const contactRoutes = require('./contact.routes');

function initRoutes(app) {
  console.log('cheguei no initRoutes')
  app.use("/api/auth", authRoutes);
  app.use("/api/contact", contactRoutes);
}

module.exports = initRoutes;