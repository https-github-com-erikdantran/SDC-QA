const mysql = require('mysql2');
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'QA'
})

module.exports = pool;