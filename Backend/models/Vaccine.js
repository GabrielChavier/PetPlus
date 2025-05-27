const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vaccine = sequelize.define('Vaccine', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Vaccine;
