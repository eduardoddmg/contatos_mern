const authRoutes = require('./auth.routes');
const contactRoutes = require('./contact.routes');
const adminRoutes = require('./admin.routes');

function initRoutes(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/admin", adminRoutes);
}

module.exports = initRoutes;