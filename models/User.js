const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const User = db.define("Livros", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    required: true,
  },
  tipo: {
    type: DataTypes.STRING,
    required: true,
  },
  detail: {
    type: DataTypes.STRING,
    required: true
  },
  quantity: {
    type: DataTypes.STRING,
    required: true,
  },
});

module.exports = User;
