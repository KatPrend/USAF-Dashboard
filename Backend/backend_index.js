const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const dataSql = fs.readFileSync('./Backend/sql_scripts/newDB.sql').toString();
const readXlsxFile = require('read-excel-file/node')
const multer = require('multer')
// Possibly remove
const PORT = process.env.PORT || 4000;
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
//const ingestRoute = require('./routes/ingestExcel')

app.use('/api/project', projectRoute);
app.use('/api/clin', clinRoute);
app.use('/api/wbs', wbsRoute);
app.use('/api/user', userRoute);
app.use('/api/funds', fundsRoute);
app.use('/api/contract', contractRoute);
//app.use('/api/ingest', ingestRoute);

// app.get('/', (req, res) => {
//      console.log("This works?");
//      res.json({message:"Backend is Working!"})
//  });

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


// const express = require('express');
// const path = require('path')
// const fs = require('fs');
// const router = express.Router()
// const bodyparser = require('body-parser')
app.use(express.static('./public'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  },
})

const uploadFile = multer({ storage: storage })

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
  
app.post('/uploadfile', uploadFile.single('uploadfile'), (req, res) => {
  importFileToDb(__dirname + '/uploads/' + req.file.filename)
  console.log(res)
})

function importFileToDb(exFile) {
  readXlsxFile(exFile).then((rows) => {

    console.log(rows);
    rows.shift()
    
      let query = 'INSERT INTO project_info_import (`TASK ID`, `Task Description`,  `Month`,  `WBS`, `CLIN`, `Source Type`, `Resource`, `Resource Description`, `Resource Type`, `Rate`, `Hours`, `Units`, `Cost`, `Base Cost`, `Direct Cost`, `Total Price`) VALUES ?'
      db.query(query, [rows], (error, response) => {
      console.log(error || response)
      })
  })
}

//All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../Frontend/build', 'index.html'));
// });

let nodeServer = app.listen(PORT, function () {
  let port = nodeServer.address().port
  let host = nodeServer.address().address
  console.log('App working on: ', host, port)
  console.log(__dirname);
});