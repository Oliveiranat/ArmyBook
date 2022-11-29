const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("armybook", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
