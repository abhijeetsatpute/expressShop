// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node',
//     password: 'Rudra@911',
// });

// module.exports = pool.promise();

//--sequelize: Uses mysql2 behind the scenes to create the connection pool--
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'nodecomplete', {
//dialect for different syntax versions of mysql
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;