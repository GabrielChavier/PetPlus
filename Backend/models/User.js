const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataType.STRING,
        alowNull: false,
    },
    username: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataType.STRING,
        allowNull: false,
    },
    role: {
        type: DataType.ENUM("admin", "common"),
        allowNull: false,
        defaultValue: "common",
    },
});

module.exports = User;