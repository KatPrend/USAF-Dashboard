const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const dataSql = fs.readFileSync('./Backend/sql_scripts/newDB.sql').toString();
// Possibly remove
const PORT = process.env.PORT || 4000;
// const readXlsxFile = require('read-excel-file/node')
// const multer = require('multer')
app.use(cors({
  origin: 'http://localhost:3000' 
}));

// app.use(express.static('./public'))
app.use(express.static(path.resolve(__dirname, '../Frontend/build')));
app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
);    


var db = require('./database');
db.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }
  console.log('Database connected.')
});

const projectRoute = require('./routes/project');
const clinRoute = require('./routes/clin');
const wbsRoute = require('./routes/wbs');
const userRoute = require('./routes/user');
const fundsRoute = require('./routes/funds');

app.use('/project', projectRoute);
app.use('/clin', clinRoute);
app.use('/wbs', wbsRoute);
app.use('/user', userRoute);
app.use('/funds', userRoute);

app.get('/', (req, res) => {
     console.log("This works?");
     res.json({message:"Backend is Working!"})
 });

 // Create Database
 app.get('/db', (req, res) => {
  db.query(dataSql, function(err, results, fields){
      if(err){
          console.log(err.message);
          res.json({error:err.message});
      }else{
          res.json({message:"Tables Created Succesfully"});
      }
  });
});


//All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../Frontend/build', 'index.html'));
// });

let nodeServer = app.listen(PORT, function () {
  let port = nodeServer.address().port
  let host = nodeServer.address().address
  console.log('App working on: ', host, port)
});