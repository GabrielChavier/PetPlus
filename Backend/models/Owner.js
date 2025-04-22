const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Owner = sequelize.define('Owner', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  cep: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Owner;
