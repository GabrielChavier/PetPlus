const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const vaccineRoutes = require('./routes/vaccineRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/vaccines', vaccineRoutes);

sequelize.sync()
  .then(() => console.log('Banco sincronizado'))
  .catch(err => console.error('Erro ao sincronizar DB:', err));

module.exports = app;
