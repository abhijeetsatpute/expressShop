const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node',
    password: 'Rudra@911',
});

module.exports = pool.promise();