const express = require('express');
const path = require('path')
const fs = require('fs');
const router = express.Router()
const multer = require('multer')
const bodyparser = require('body-parser')
const readXlsxFile = require('read-excel-file/node')
router.use(express.static('./public'))

var db = require('../database');
const { resolve } = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  },
})

const uploadFile = multer({ storage: storage })

router.post('/propricerUpload/:projectId', uploadFile.single('propricerUpload'), async (req, res) => {

  console.log("Create the Temp Table")
  await createTempTable();

  console.log("Import into Temp table ");
  
  await importProPricerToDb(__dirname + '/uploads/' + req.file.filename, req.params.projectId);

  console.log("Insert into real table");  

  await importTRT(req.params.projectId);

  console.log("Drop the Table");

  await dropTempTable();
  

  try {
    await fs.unlink(__dirname + '/uploads/' + req.file.filename, function(error, response){
      console.log(error || response);
      resolve();
    });
    console.log(`successfully deleted ${__dirname}/uploads/${req.file.filename}`);
  } catch (error) {
    console.error('there was an error:', error.message);
  }

  //console.log(res);

});

function createTempTable(){

  let createTempTable = `
  CREATE TEMPORARY TABLE 
    temp_propricer_table 
  SELECT 
    task_id,
    task_description, 
    month,
    wbs, 
    clin_num, 
    source_type, 
    resource_code, 
    resource_description, 
    resource_type, 
    rate, 
    hours_worked, 
    units, 
    cost, 
    base_cost, 
    direct_cost, 
    total_price 
  FROM 
    task_resource_table 
  LIMIT 0;`;

  return new Promise((resolve) => {
    db.query(createTempTable, function(error, response){
      console.log(error || response);
      resolve();
    });
  });

}

function importProPricerToDb(exFile, projectId) {
return new Promise((resolve) => {
  readXlsxFile(exFile).then((rows) => {
    //console.log(rows);
    rows.shift()
    
      let query = `
      INSERT INTO temp_propricer_table(
        task_id,
        task_description,
        month,
        wbs, 
        clin_num, 
        source_type, 
        resource_code, 
        resource_description, 
        resource_type, 
        rate, 
        hours_worked, 
        units, 
        cost, 
        base_cost, 
        direct_cost, 
        total_price) 
      VALUES ?`;

        db.query(query, [rows], (error, response) => {
          console.log(error || response);
          resolve();
        })
      });
  });

}

function importTRT(projectId){
  let trtInsert = `
  INSERT INTO task_resource_table (
      project_id,
      clin_id,task_id, 
      task_description, 
      month, 
      wbs, 
      clin_num, 
      source_type, 
      resource_code, 
      resource_description, 
      resource_type, 
      rate, 
      hours_worked, 
      units, 
      cost, 
      base_cost, 
      direct_cost, 
      total_price ) 
    SELECT 
      p.id, 
      c.id, 
      tpt.* 
    FROM 
      project p 
    INNER JOIN 
      temp_propricer_table tpt 
    INNER JOIN clin_data c 
      ON c.project_id = p.id 
      AND c.clin_num = tpt.clin_num 
    WHERE p.id = "${projectId}"`;
    return new Promise((resolve) => {
      db.query(trtInsert, (error, response) => {
        console.log(error || response);
        resolve();
      });
    });
}

function dropTempTable(){
  let dropTempTable = 'DROP TEMPORARY TABLE temp_propricer_table';
  return new Promise((resolve) => {  
    db.query(dropTempTable, function(error, response){
      console.log(error || response);
      resolve();
    });
  });
}


router.post('/milestonesUpload/:projectId', uploadFile.single('milestonesUpload'), async (req, res) => {

  // Create the temp milestones table
  console.log("Create temp milestones table");
  await createTempMilestones();

  // Insert into the temp table
  console.log("Import Data into temp milestones table");
  await importMilestonesToDb(__dirname + '/uploads/' + req.file.filename, req.params.projectId);
  
  // Copy the temp table
  console.log("Copy temp table");
  await copyMilestonesTable();

  // Import Into Project Milestones
  console.log("Importing into project Milestones");
  await importIntoProjectMilestones(req.params.projectId);

  // Import Into Project Milestones Dependency
  console.log("Importing into project Milestones Dependency");
  await importIntoProjectDependency(req.params.projectId);
 
  // Delete the temp tables
  console.log("Delete the temp tables");
  await deleteTempMilestone();
  
  try {
    await fs.unlink(__dirname + '/uploads/' + req.file.filename, function(error, response){
      console.log(error || response);
      resolve();
    });
    console.log(`successfully deleted ${__dirname}/uploads/${req.file.filename}`);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
  //console.log(res);

});

function createTempMilestones(){
 // Create the table
 let createTempTable = `
  CREATE TEMPORARY TABLE temp_milestones_table(
   id int(11),
   name varchar(50),
   start_date date,
   end_date date,
   predecessors int(11)
  )`;

  return new Promise((resolve) => {  
   db.query(createTempTable, function(error, response){
     console.log(error || response);
     resolve();
   });
  });
};

function importMilestonesToDb(exFile, projectId) {

  return new Promise((resolve) => {  
    readXlsxFile(exFile).then((rows) => {
      console.log(rows);
      rows.shift()
        let query = `
        INSERT INTO temp_milestones_table
        ( id, name, start_date, end_date, predecessors)
        VALUES ?`;
        db.query(query, [rows], (error, response) => {
          console.log(error || response);
          resolve();
        })
    });
  });
};

function copyMilestonesTable(){
  return new Promise((resolve) => {  
    let copyTempTable = `
    CREATE TEMPORARY TABLE tmt_copy 
    SELECT * 
    FROM temp_milestones_table`;
    db.query(copyTempTable, function(error, response){
      console.log(error || response);
      resolve();
    });
  });
};


function importIntoProjectMilestones(projectId){
  let milestonesInsert = `
    INSERT INTO project_milestones (project_id, task_name, start_date, end_date)
    SELECT
      p.id as project_id,
      tmt.name as task_name,
      tmt.start_date as start_date,
      tmt.end_date as end_date
    FROM project p
    INNER JOIN temp_milestones_table tmt
    WHERE p.id = "${projectId}"`;

    return new Promise((resolve) => {  
      db.query(milestonesInsert, (error, response) => {
        console.log(error || response);
        resolve();
      });
    });
};

function importIntoProjectDependency(projectId){
  let dependencyInsert = `
  INSERT INTO project_milestone_dependency
  SELECT 
    pm.project_id,
    pm.id as successor_event,
    pm2.project_id,
    pm2.id as dependency_event
  FROM project_milestones pm, project_milestones pm2
  JOIN temp_milestones_table tmt
  JOIN tmt_copy tmt2 ON tmt.predecessors = tmt2.id
  WHERE pm.project_id = "${projectId}" 
  AND pm.task_name = tmt2.name 
  AND pm2.project_id = "${projectId}" 
  AND pm2.task_name = tmt.name`;

  return new Promise((resolve) => {  
    db.query(dependencyInsert, (error, response) => {
      console.log(error || response);
      resolve();
    });
  });
}


function deleteTempMilestone(){
  let dropTempTable = `
  DROP TEMPORARY TABLE temp_milestones_table;
  DROP TEMPORARY TABLE tmt_copy;
  `;

  return new Promise((resolve) => { 
    db.query(dropTempTable, function(error, response){
      console.log(error || response);
      resolve();
    });
  });
}

module.exports = router;