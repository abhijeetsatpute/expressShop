const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', 'Rudra@911', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;