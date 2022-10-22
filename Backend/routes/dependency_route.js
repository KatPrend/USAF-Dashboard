const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    let sql = `
    SELECT * 
    FROM dependency`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.post('/', (req, res) => {
    // const {project_name, project_type, contract_status, branch, contract_num, requirement_type, summary, ccar_num} = req.body;
    // let sql = `INSERT INTO project (project_name, project_type, contract_status, branch, contract_num, requirement_type, summary, ccar_num) VALUES ("${project_name}","${project_type}","${contract_status}", "${branch}", "${contract_num}", "${requirement_type}", "${summary}", "${ccar_num}")`;
    // //let sql = `INSERT INTO project (project_name,project_type,contract_status) VALUES ("${project_name},${project_type},${contract_status}, ${branch}, ${contract_num}, ${requirement_type}, ${summary}, ${ccar_num}")`;
    // let query = db.query(sql, (err, results) =>{
    //     if(err){
    //         throw err
    //     }
    //     res.send(results)
    // })
    console.log(req.body);
});

router.put("/", (req, res)=>{
    res.send({message:"TODO: Make an update clin endpoint"})
})

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete clin endpoint"})
})

// Get Clin by projectid
router.get('/:project_id', (req, res) => {
    let sql = `
    SELECT * 
    FROM clin_data 
    WHERE project_id = "${req.params.project_id}"`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
  });


router.get('/grabDepend/:projectid', (req, res) => {
    let sql = `
    SELECT dependency 
    FROM dependency_table 
    WHERE successor = ${req.params.projectid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

router.get('/grabSuccesor/:projectid', (req, res) => {
    let sql = `
    SELECT successor 
    FROM dependency_table 
    WHERE dependency = ${req.params.projectid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

module.exports = router;