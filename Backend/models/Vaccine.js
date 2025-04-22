const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Pet = require('./Pet');

const Vaccine = sequelize.define('Vaccine', {
  name: DataTypes.STRING,
  date: DataTypes.DATE,
});

Pet.hasMany(Vaccine, { onDelete: 'CASCADE' });
Vaccine.belongsTo(Pet);

module.exports = Vaccine;