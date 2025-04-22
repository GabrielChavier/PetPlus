const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage:"./Backend/database.sqlite", //Arquivo do banco de dados
    logging: false, //Desativa logs do sequelize
});

module.exports = sequelize;

