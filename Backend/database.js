const { host, user, password, db_port, db_name } = require("./config")
const mysql = require('mysql');

var db = mysql.createConnection({
    host:host, 
    user:user, 
    password:password, 
    database:db_name,
    port:db_port, 
    multipleStatements: true
  });

module.exports = db;