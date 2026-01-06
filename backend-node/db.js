const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crypto_portfolio'
});


module.exports = db;