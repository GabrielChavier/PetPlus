const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = 'segredo_super_secreto'; // idealmente em .env

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '2h' });
    res.json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login', error: err.message });
  }
};