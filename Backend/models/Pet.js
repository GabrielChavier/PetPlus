const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pet = sequelize.define('Pet', {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // ← boa prática: evitar valores nulos
  },
  species: DataTypes.STRING,
  breed: DataTypes.STRING,
  gender: DataTypes.STRING,
  age: DataTypes.INTEGER,
  photo: DataTypes.STRING,
  adopted: {
  type: DataTypes.BOOLEAN, 
  defaultValue: false
},
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Pet;
