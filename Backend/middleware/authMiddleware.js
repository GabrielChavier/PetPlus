// =========================================
// authMiddleware.js
// Middleware de autenticação via JWT
// =========================================

const jwt = require('jsonwebtoken');

// Chave secreta usada para assinar e verificar o token JWT
// Em produção, utilize uma variável de ambiente: process.env.JWT_SECRET
const SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt';

/**
 * Middleware responsável por verificar se o token JWT enviado na requisição é válido.
 * Caso seja válido, o conteúdo do token é armazenado em `req.user`.
 * Caso contrário, a requisição é bloqueada com erro 401 ou 403.
 */
function verificarToken(req, res, next) {
  // Recupera o cabeçalho de autorização da requisição (Authorization: Bearer <token>)
  const authHeader = req.headers['authorization'];

  // Se o cabeçalho estiver presente, divide a string para obter apenas o token
  // Exemplo: "Bearer abc123" -> ["Bearer", "abc123"]
  const token = authHeader && authHeader.split(' ')[1];

  // Se não houver token, responde com erro 401 (não autorizado)
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Verifica se o token é válido usando a chave secreta
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      // Se o token for inválido ou expirado, responde com erro 403 (proibido)
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Se o token for válido, armazena os dados decodificados na requisição
    // Isso permitirá acessar os dados do usuário autenticado nas próximas rotas (ex: req.user.id)
    req.user = decoded;

    // Continua para o próximo middleware ou função da rota
    next();
  });
}

// Exporta apenas a função verificarToken como middleware principal
// Isso permite fazer: const auth = require('./authMiddleware');
module.exports = verificarToken;
