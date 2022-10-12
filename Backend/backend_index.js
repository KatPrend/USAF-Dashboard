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

const projectRoute = require('./routes/project_route');
const clinRoute = require('./routes/clin_route');
const wbsRoute = require('./routes/wbs_route');
const userRoute = require('./routes/user_route');
const fundsRoute = require('./routes/funds_route');
const contractRoute = require('./routes/contract_route');

app.use('/api/project', projectRoute);
app.use('/api/clin', clinRoute);
app.use('/api/wbs', wbsRoute);
app.use('/api/user', userRoute);
app.use('/api/funds', fundsRoute);
app.use('/api/contract', contractRoute);

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