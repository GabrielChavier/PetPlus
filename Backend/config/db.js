const { Sequelize } = require('sequelize');
const path = require('path');

// Cria conexão com SQLite (armazenado em arquivo local)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'), // garante o caminho correto
  logging: false // define se deve mostrar as queries no terminal
});

module.exports = sequelize;
