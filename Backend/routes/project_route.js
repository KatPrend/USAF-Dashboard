const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    let sql = 'SELECT * FROM Project'
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.post('/', (req, res) => {
    const {project_name, project_type, contract_status, branch, contract_num, requirement_type, summary, ccar_num} = req.body;
    let sql = `INSERT INTO project (project_name, project_type, contract_status, branch, contract_num, requirement_type, summary, ccar_num) VALUES ("${project_name}","${project_type}","${contract_status}", "${branch}", "${contract_num}", "${requirement_type}", "${summary}", "${ccar_num}")`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

router.put('/', (req, res)=>{
    res.send({message:"TODO: Make an update project endpoint"})
})

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete project endpoint"})
})

// Grabbing roles
// router.get('/')

router.get('/userEmail/:userEmail', (req, res) => {
    let sql = `SELECT * FROM users u inner join user_project_link upl on upl.user_id = u.user_id inner join project p on p.project_id = upl.project_id WHERE u.userEmail = "${req.params.userEmail}"`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Grabbing all of the project information
router.get('/schedule/:projectID', (req, res) => {
    let sql = `SELECT project_information_id as ID, task_name as "Name", duration as "Duration", DATE_FORMAT(startDate,'%y-%m-%d') as "Start", DATE_FORMAT(finishDate,'%y-%m-%d') as "End", resource_names as "Predecessors",wbs as "WBS" FROM project_information WHERE project_id = ${req.params.projectID}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;
  