const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage:"./database.sqlite", //Arquivo do banco de dados
    logging: false, //Desativa logs do sequelize
});

module.exports = sequelize;