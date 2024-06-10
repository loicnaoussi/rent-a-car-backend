const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('rent_a_car', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Vehicle = require('./vehicle')(sequelize, Sequelize);

module.exports = db;
