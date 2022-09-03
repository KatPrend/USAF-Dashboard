const express = require('express');
const mysql = require('mysql');


const dataSql = fs.readFileSync('./Backend/database.sql').toString();

const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "USAFTest"
});

app.get('/createproject', (req, res) => {
    connection.connect();
    res.json({message:"Hello from server!"});

    // let make_table = 'CREATE TABLE if not exists admin_user{ admin_id int primary key AUTO_INCREMENT, admin_user_name varchar(40), email varchar(60) NOT NULL, password varchar(12) NOT NULL};';
    // 'CREATE TABLE if not exists user(id int primary key AUTO_INCREMENT, firstName varchar(255) NOT NULL, lastName varchar(255) NOT NULL)';
    connection.query(dataSQL, function(err, results, fields){
        if(err){
            console.log(err.message);
        }
    });
    

    connection.end();
});

app.listen('3000', () => {
    console.log('Server started');
})
