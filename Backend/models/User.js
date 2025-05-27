const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Pet = require('./Pet'); // <- Importa o model Pet

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('usuario'),
    allowNull: false,
  }
});

// Associação entre User e Pet
User.hasMany(Pet, { foreignKey: 'userId' });
Pet.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
