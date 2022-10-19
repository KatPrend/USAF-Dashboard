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


router.get('/propricerUpload/:projectId', uploadFile.single('propricerUpload'), (req, res) => {

  res.send(`{message:${req.params.projectId}}`);

});

router.post('/propricerUpload/:projectId', uploadFile.single('propricerUpload'), (req, res) => {

  let createTempTable = 'CREATE TEMPORARY TABLE temp_propricer_table SELECT task_id, task_description, month, wbs, clin_num, source_type, resource_code, resource_description, resource_type, rate, hours_worked, units, cost, base_cost, direct_cost, total_price FROM task_resource_table LIMIT 0;';
  db.query(createTempTable, function(error, response){
    console.log(error || response);
  });

  importProPricerToDb(__dirname + '/uploads/' + req.file.filename, req.params.projectId);
  
  let trtInsert = `INSERT INTO task_resource_table (project_id,clin_id,task_id, task_description, month, wbs, clin_num, source_type, resource_code, resource_description, resource_type, rate, hours_worked, units, cost, base_cost, direct_cost, total_price ) SELECT p.project_id, c.clin_id, tpt.* FROM project p INNER JOIN temp_propricer_table tpt INNER JOIN clin_data c ON c.project_id = p.project_id AND c.clin_num = tpt.clin_num WHERE p.project_id = "${projectId}"`;
  db.query(trtInsert, (error, response) => {
    console.log(error || response)
  })

  let dropTempTable = 'DROP TEMPORARY TABLE temp_propricer_table';
  db.query(dropTempTable, function(error, response){
    console.log(error || response);
  });
  
  
  console.log(res);

});

// router.post('/propricerSubmit/:project_id', (req, res) => {

//   let query = `INSERT INTO task_resource_table (project_id,clin_id,task_id, task_description, month, wbs, clin_num, source_type, resource_code, resource_description, resource_type, rate, hours_worked, units, cost, base_cost, direct_cost, total_price ) SELECT p.project_id, c.clin_id, tpt.* FROM project p INNER JOIN temp_propricer_table tpt INNER JOIN clin_data c ON c.project_id = p.project_id AND c.clin_num = tpt.clin_num WHERE p.project_id = "${req.params.project_id}"`;
//   db.query(query, [rows], (error, response) => {
//     console.log(error || response)
//   })

// });

function importProPricerToDb(exFile, projectId) {

  readXlsxFile(exFile).then((rows) => {

    console.log(rows);
    rows.shift()
    
      let query = 'INSERT INTO temp_propricer_table(`task_id`,`task_description`,`month`,`wbs`, `clin_num`, `source_type`, `resource_code`, `resource_description`, `resource_type`, `rate`, `hours_worked`, `units`, `cost`, `base_cost`, `direct_cost`, `total_price`) VALUES ?'
      db.query(query, [rows], (error, response) => {
        console.log(error || response)
      })
  });

}

module.exports = router;