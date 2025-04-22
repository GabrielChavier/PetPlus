const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pet = sequelize.define('Pet', {
  name: DataTypes.STRING,
  species: DataTypes.STRING,
  adopted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = Pet;