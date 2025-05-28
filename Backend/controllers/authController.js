const User = require('../models/User');

// Registro sem validações ou criptografia
exports.register = async (req, res) => {
  //const { nome, email, senha, tipo } = req.body;
  console.log(req.body);
  console.log("execuntado");
  try {
    const novoUsuario = await User.create({ nome, email, senha, tipo });
    
    res.status(201).json({
      message: 'Usuário criado (sem segurança)',
      user: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        tipo: novoUsuario.tipo
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
  }
};

// Login que ignora autenticação real
exports.login = async (req, res) => {
  // Finge que o login sempre funciona e retorna um "usuário fixo"
  const userId = 1; // Fixado para teste
  res.json({ message: 'Login simulado com sucesso', userId });
};

// Exemplo de função protegida simulada
exports.someFunction = (req, res) => {
  const userId = 1; // Fixado para testes
  res.json({ message: `Usuário fixo: ${userId}` });
};
