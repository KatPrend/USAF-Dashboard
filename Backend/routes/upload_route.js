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

// router.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })
  
router.post('/uploadfile/', uploadFile.single('uploadfile'), (req, res) => {
  //console.log(req.params.uploadType);

  importFileToDb(__dirname + '/uploads/' + req.file.filename)
  console.log(res)

//   fs.unlinkSync(__dirname + '/uploads/' + req.file.filename);
})

function importFileToDb(exFile) {
  let createTempTable = 'CREATE TEMPORARY TABLE temp_propricer_table SELECT task_id, task_description, month, wbs, clin_num, source_type, resource_code, resource_description, resource_type, rate, hours_worked, units, cost, base_cost, direct_cost, total_price FROM task_resource_table LIMIT 0;'
  db.query(createTempTable, function(error, response){
    console.log(error || response);
  });

  readXlsxFile(exFile).then((rows) => {

    console.log(rows);
    rows.shift()
    
      let query = 'INSERT INTO temp_propricer_table(`task_id`,`task_description`,`month`,`wbs`, `clin_num`, `source_type`, `resource_code`, `resource_description`, `resource_type`, `rate`, `hours_worked`, `units`, `cost`, `base_cost`, `direct_cost`, `total_price`) VALUES ?'
      db.query(query, [rows], (error, response) => {
        console.log(error || response)
      })
  })
}

module.exports = router;