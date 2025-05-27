const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = process.env.JWT_SECRET || 'seu_segredo_super_secreto';

exports.register = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  try {
    const userExistente = await User.findOne({ where: { email } });
    if (userExistente) {
      return res.status(409).json({ message: 'Email já está em uso' });
    }
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await User.create({ nome, email, senha: senhaHash, tipo });
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email, tipo: novoUsuario.tipo }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida' });
    }
    const token = jwt.sign({ id: user.id, tipo: user.tipo }, SECRET, { expiresIn: '2h' });
    res.json({ message: 'Login realizado com sucesso', token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login', error: err.message });
  }
};
