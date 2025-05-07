const jwt = require('jsonwebtoken');
const SECRET = 'seu_segredo_jwt'; // Em produção, use: process.env.JWT_SECRET

// =====================================
// Middleware para verificar o token JWT
// =====================================
exports.verificarToken = (req, res, next) => {
  // O token geralmente vem no cabeçalho Authorization: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Pega apenas o token (parte após "Bearer")

  // Se não houver token, bloqueia a requisição e retorna erro 401 (não autorizado)
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Verifica se o token é válido utilizando a chave secreta
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      // Se o token for inválido, retorna erro 403 (proibido)
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Armazena os dados decodificados do token na requisição
    // Ex: { id: 123, tipo: 'usuario' }
    req.user = decoded;
    next(); // Chama o próximo middleware ou função de rota
  });
};

// ===================================================
// Middleware para autorizar somente tipos permitidos
// Exemplo: autorizarTipos('instituto', 'desenvolvedor')
// ===================================================
exports.autorizarTipos = (...tiposPermitidos) => {
  return (req, res, next) => {
    // Se o tipo de usuário do token não estiver na lista permitida, bloqueia e retorna erro 403
    if (!tiposPermitidos.includes(req.user.tipo)) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next(); // Chama o próximo middleware ou função de rota
  };
};
