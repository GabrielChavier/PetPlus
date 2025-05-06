const express = require('express');
const path = require('path');
const sequelize = require('./config/db'); // Conexão Sequelize (SQLite)

const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const vaccineRoutes = require('./routes/vaccineRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

const app = express();

// Middleware para interpretar JSON nas requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (ex: imagens)
// Exemplo: http://localhost:3000/uploads/foto.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas da API organizadas por domínio
app.use('/api/auth', authRoutes);         // Autenticação de usuários
app.use('/api/pets', petRoutes);          // Gestão de pets
app.use('/api/vaccines', vaccineRoutes);  // Controle de vacinas
app.use('/api/owners', ownerRoutes);      // Informações dos donos

// Sincroniza os modelos Sequelize com o banco de dados e inicia o servidor
sequelize.sync({ force: false }) // force: false → mantém os dados existentes
  .then(() => {
    console.log('✅ Banco de dados sincronizado com sucesso!');
    app.listen(3000, () => {
      console.log('🚀 Servidor rodando em http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ Erro ao sincronizar com o banco:', err);
  });

module.exports = app;
