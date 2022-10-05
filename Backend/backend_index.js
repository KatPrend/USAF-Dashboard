const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyparser = require('body-parser');
// const readXlsxFile = require('read-excel-file/node')
const mysql = require('mysql');
// const multer = require('multer')
const app = express();

const PORT = process.env.PORT || 4000;

// app.use(express.static('./public'))
app.use(express.static(path.resolve(__dirname, '../Frontend/build')));
app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
);
    
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'
}));

const dataSql = fs.readFileSync('./Backend/sql_scripts/newDB.sql').toString();

// Server name: usaf-dashboard-server
// Azure MySQL admin login
// usaf_admin
// Thisisourdatatbase21.

// Connecting to Azure MySQL
var db=mysql.createConnection({
    host:"usaf-dashboard-server.mysql.database.azure.com", 
    user:"usaf_admin", 
    password:"Thisisourdatatbase21.", 
    database:"usaf-dash", 
    port:3306, 
    multipleStatements: true
  });

// Localhost
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     port: 8889,
//     database: "USAFTest",
//     multipleStatements: true
// });

db.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }
  console.log('Database connected.')
});

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, __dirname + '/uploads/')
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
//     },
//   })
//   const uploadFile = multer({ storage: storage })
//   app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
//   })
//   app.post('/import-excel', uploadFile.single('import-excel'), (req, res) => {
//     importFileToDb(__dirname + '/uploads/' + req.file.filename)
//     console.log(res)
//   })

//   function importFileToDb(exFile) {
//     readXlsxFile(exFile).then((rows) => {
//       rows.shift()
      
//         let query = 'INSERT INTO project_info_import (`TASK ID`, `Task Description`,  `Month`,  `WBS`, `CLIN`, `Source Type`, `Resource`, `Resource Description`, `Resource Type`, `Rate`, `Hours`, `Units`, `Cost`, `Base Cost`, `Direct Cost`, `Total Price`) VALUES ?'
//         db.query(query, [rows], (error, response) => {
//         console.log(error || response)
//         })
        
//     })
//   }

app.get('/', (req, res) => {
     console.log("This works?");
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
  })
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

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../Frontend/build', 'index.html'));
});

let nodeServer = app.listen(PORT, function () {
  let port = nodeServer.address().port
  let host = nodeServer.address().address
  console.log('App working on: ', host, port)
});