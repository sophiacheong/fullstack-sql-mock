const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eBay'
});

db.connect((err) => {
  if (err) console.log(err)
  else console.log('success')
});

module.exports = db;
