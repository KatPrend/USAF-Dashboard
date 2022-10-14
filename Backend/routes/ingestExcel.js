const express = require('express');
const path = require('path')
const fs = require('fs');
const router = express.Router()
const multer = require('multer')
const bodyparser = require('body-parser')
const readXlsxFile = require('read-excel-file/node')
router.use(express.static('./public'))


var db = require('../database');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  },
})

const uploadFile = multer({ storage: storage })

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
  
router.post('/uploadfile', uploadFile.single('uploadfile'), (req, res) => {
  importFileToDb(__dirname + '/uploads/' + req.file.filename)
  console.log(res)

//   fs.unlinkSync(__dirname + '/uploads/' + req.file.filename);
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

module.exports = router;