const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt';

/**
 * Middleware para verificar token JWT em requisições.
 * Em caso de sucesso, popula req.user com dados decodificados.
 * Caso contrário, responde com JSON e status HTTP adequado.
 */
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = verificarToken;
