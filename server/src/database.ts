import mysql from 'promise-mysql';

import keys from './keys';
// const pool = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'car'
// }).then(function(conn){
//   // do stuff with conn
//   conn.end();
// });

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'test'
// });
 
// connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
// connection.end();
const pool = mysql.createPool(keys.database);
pool.getConnection().then(connection => {
  pool.releaseConnection(connection);
  console.log('DB is connected')
}).catch(error => {
  console.log(error);
});

export default pool;
