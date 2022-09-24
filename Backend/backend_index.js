const express = require('express');
const fs = require('fs');
const path = require('path')
const bodyparser = require('body-parser')
// const readXlsxFile = require('read-excel-file/node')
const mysql = require('mysql')
// const multer = require('multer')
const app = express()
app.use(express.static('./public'))
app.use(bodyparser.json())
app.use(
    bodyparser.urlencoded({
        extended: true,
    }),
    )    
    
const dataSql = fs.readFileSync('./Backend/sql_scripts/createDatabaseTables.sql').toString();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "USAFTest",
    multipleStatements: true
});

db.connect(function (err) {
    if (err) {
      return console.error('error: ' + err.message)
    }
    console.log('Database connected.')
  })

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
 })

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

app.get('/getproject', (req, res) => {
  let sql = 'SELECT * FROM Project'
  let query = db.query(sql, (err, results) =>{
      if(err){
          throw err
      }
      res.send(results)
  })
})

app.get('/getprojectbyuser/:userEmail', (req, res) => {
  let sql = 'SELECT * FROM `users` u inner join user_project_link upl on upl.user_id = u.user_id inner join project p on p.project_id = upl.project_id WHERE upl.userEmail = ${req.params.userEmail}'
  let query = db.query(sql, (err, results) =>{
      if(err){
          throw err
      }
      res.send(results)
  })
})
  
let nodeServer = app.listen(4000, function () {
  let port = nodeServer.address().port
  let host = nodeServer.address().address
  console.log('App working on: ', host, port)
})








// app.listen('3000', () => {
//     console.log('Server started');
// })
