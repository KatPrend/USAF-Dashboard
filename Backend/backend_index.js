const express = require('express');
const mysql = require('mysql');
const app = express();
const fs = require('fs');

const dataSql = fs.readFileSync('./Backend/sql_scripts/createDatabaseTables.sql').toString();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "USAFTest",
    multipleStatements: true
});


app.get('/createproject', (req, res) => {
    connection.connect();
    
    connection.query(dataSql, function(err, results, fields){
        if(err){
            console.log(err.message);
            res.json({error:err.message});
        }else{
            res.json({message:"Tables Created Succesfully"});
        }
    });

    connection.end();
});

app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
  });


app.listen('3000', () => {
    console.log('Server started');
})
