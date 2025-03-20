const { sequelize } = require("sequelize");

const sequelize = new sequelize({
    dialect: "sqlite",
    storage:"./database.sqlite", //Arquivo do banco de dados
    logging: false, //Desativa logs do sequelize
});

module.exports = sequelize;