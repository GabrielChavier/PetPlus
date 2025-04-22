const bcrypt = require('bcrypt');
const Owner = require('../models/Owner');

exports.registerOwner = async (req, res) => {
  const { name, email, city, state, cep, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'As senhas não coincidem' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const newOwner = await Owner.create({
      name,
      email,
      city,
      state,
      cep,
      password: hash,
    });

    res.status(201).json({ message: 'Dono cadastrado com sucesso', owner: newOwner });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar dono', error: err.message });
  }
};
