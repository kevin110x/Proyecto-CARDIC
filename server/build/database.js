"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
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
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log('DB is connected');
}).catch(error => {
    console.log(error);
});
exports.default = pool;
