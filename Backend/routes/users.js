const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // se usar senhas criptografadas
const db = require("../db"); // SQLite ou Sequelize
require("dotenv").config();

// Exemplo usando SQLite com raw SQL
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha obrigatórios" });
  }

  try {
    // Busca o usuário no banco
    const result = await db.get(`SELECT * FROM usuarios WHERE email = ?`, [email]);

    if (!result) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    // Se a senha for criptografada no banco:
    const senhaCorreta = await bcrypt.compare(senha, result.senha);

    // Se for senha em texto puro (não recomendado), use:
    // const senhaCorreta = senha === result.senha;

    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    // Cria token JWT
    const token = jwt.sign({ id: result.id, email: result.email }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    // Retorna o token
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

module.exports = router;
