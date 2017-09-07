var sql = require('mysql');

var connection = sql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

module.exports = connection
