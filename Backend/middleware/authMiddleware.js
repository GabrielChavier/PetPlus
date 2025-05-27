// authMiddleware.js
module.exports = (req, res, next) => {
  // Middleware desativado, deixa passar tudo sem checar token
  next();
};
