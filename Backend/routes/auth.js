const express = require('express');
const router = express.Router();
const { User } = require('./models'); // Ajuste se o caminho for diferente

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    res.json({ message: 'Login realizado com sucesso', name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
