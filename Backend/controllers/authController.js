const bcrypt = require('bcrypt'); // Para hash de senhas
const jwt = require('jsonwebtoken'); // Para gerar tokens JWT
const User = require('../models/User'); // Modelo Sequelize do usuário

const SECRET = 'seu_segredo_super_secreto'; // Em produção, use variável de ambiente (.env)

// =========================
// REGISTRO DE USUÁRIO
// =========================
exports.register = async (req, res) => {
  // Extração dos dados enviados no corpo da requisição
  const { nome, email, senha, tipo } = req.body;

  try {
    // Geração do hash seguro da senha usando bcrypt
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criação do novo usuário no banco de dados
    const novoUsuario = await User.create({
      nome,
      email,
      senha: senhaHash,
      tipo, // Pode ser 'usuario', 'instituto' ou 'desenvolvedor'
    });

    // Resposta com status 201 (Criado) e os dados do usuário criado
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        tipo: novoUsuario.tipo,
      },
    });
  } catch (err) {
    // Tratamento de erros como e-mails duplicados ou falha na criação
    res.status(500).json({
      message: 'Erro ao criar usuário',
      error: err.message,
    });
  }
};

// =========================
// LOGIN DO USUÁRIO
// =========================
exports.login = async (req, res) => {
  // Extração do email e senha enviados no corpo da requisição
  const { email, senha } = req.body;

  try {
    // Busca pelo usuário no banco com base no email
    const user = await User.findOne({ where: { email } });

    // Se não encontrar o usuário, retorna erro 401 (Não autorizado)
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se a senha fornecida bate com o hash salvo no banco
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Geração do token JWT com o ID e tipo do usuário
    const token = jwt.sign(
  { id: user.id, tipo: user.tipo },
  SECRET,
  { expiresIn: '2h' }
);


    // Retorna o token para o cliente
    res.json({
      message: 'Login realizado com sucesso',
      token,
    });
  } catch (err) {
    // Tratamento de erro no login (ex: erro no banco)
    res.status(500).json({
      message: 'Erro no login',
      error: err.message,
    });
  }
};
