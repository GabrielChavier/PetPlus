
const { Sequelize } = require('sequelize');

// Cria conexão com SQLite (armazenado em arquivo local)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // ou o caminho completo do arquivo .sqlite
});

module.exports = sequelize;
