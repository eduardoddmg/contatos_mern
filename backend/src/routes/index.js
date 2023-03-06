const auth = require('./auth.routes');
const contact = require('./contact.routes');
const admin = require('./admin.routes');

const { errorHandler, notFound } = require("../middlewares");

console.log(errorHandler, notFound)

function initRoutes(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/admin", adminRoutes);

  app.use(notFound);
  app.use(errorHandler);
}


module.exports = { auth, contact, admin };