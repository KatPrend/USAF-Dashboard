const { endpoint, port, host, user, password, db_port, db_name } = require('../Backend/config');
const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000'
}));
const dataSql = fs.readFileSync('./Backend/sql_scripts/newDB.sql').toString();

// Connecting to Azure MySQL Database
var db=mysql.createConnection({
    host:host, 
    user:user, 
    password:password, 
    database:db_name,
    port:db_port, 
    multipleStatements: true
  });

db.connect(function (err) {
    if (err) {
      return console.error('error: ' + err.message)
    }
    console.log('Database connected.')
  });

app.get('/', (req, res) => {
     console.log("This works");
 });

app.post("/newProject", (req, res) => {
  const {email, password} = req.body;

});

app.get('/createproject', (req, res) => {
  db.query(dataSql, function(err, results, fields){
      if(err){
          console.log(err.message);
          res.json({error:err.message});
      }else{
          res.json({message:"Tables Created Succesfully"});
      }
  });
});

app.get('/api/getproject', (req, res) => {
  let sql = 'SELECT * FROM Project'
  let query = db.query(sql, (err, results) =>{
      if(err){
          throw err
      }
      res.send(results)
  });
});

app.get('/api/getprojectbyuser/:userEmail', (req, res) => {
  let sql = 'SELECT * FROM `users` u inner join user_project_link upl on upl.user_id = u.user_id inner join project p on p.project_id = upl.project_id WHERE u.userEmail =' + '"' + req.params.userEmail + '"';
  let query = db.query(sql, (err, results) =>{
      if(err){
          throw err
      }
      res.send(results)
  });
});
  
let nodeServer = app.listen(port, function () {
  let port = nodeServer.address().port
  let host = nodeServer.address().address
  console.log('App working on: ', host, port)
});