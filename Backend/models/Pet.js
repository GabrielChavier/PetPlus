const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const Owner = require('./Owner'); // Importa o modelo de Dono

const Pet = sequelize.define('Pet', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species: DataTypes.STRING,
  breed: DataTypes.STRING,
  gender: DataTypes.STRING,
  age: DataTypes.INTEGER,
  photo: DataTypes.STRING, // Caminho da imagem
  adopted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default como false para indicar que o pet não foi adotado
  }
});

// Relacionamento: Um dono tem muitos pets
Owner.hasMany(Pet, { foreignKey: 'ownerId' });
Pet.belongsTo(Owner, { foreignKey: 'ownerId' });

module.exports = Pet;
