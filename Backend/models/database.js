const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // ou caminho correto do seu arquivo SQLite
});

module.exports = sequelize;
