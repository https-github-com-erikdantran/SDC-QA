const mysql = require('mysql');
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'QA'
})

module.exports = pool;