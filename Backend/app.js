const express = require('express');
const path = require('path');
const sequelize = require('./config/db'); // Corrigido para o mesmo arquivo de configuração

const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const vaccineRoutes = require('./routes/vaccineRoutes');
const ownerRoutes = require('./routes/ownerRoutes'); // novo

const app = express();

// Middleware para JSON
app.use(express.json());

// Servir arquivos estáticos (imagens)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/vaccines', vaccineRoutes);
app.use('/api/owners', ownerRoutes); // novo

// Sincronização do banco de dados
sequelize.sync()
  .then(() => console.log('Banco sincronizado'))
  .catch(err => console.error('Erro ao sincronizar DB:', err));

module.exports = app;
