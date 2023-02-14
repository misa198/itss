const Sequelize = require("sequelize");

const getUserModel = require("./user");
const getTaskModel = require("./task");

const sequelize = new Sequelize('itss', 'bacnd', '123456789', {
	host: 'localhost',
	dialect: 'postgres',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},

});


const models = {
  User: getUserModel(sequelize, Sequelize),
  Task: getTaskModel(sequelize, Sequelize),
};

module.exports = {
  sequelize,
  models
}
