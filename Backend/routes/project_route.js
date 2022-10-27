const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    let sql = `
    SELECT * 
    FROM project`
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.post('/', (req, res) => {
    const {project_name, project_type, contractor_id, contract_status, branch, contract_num, requirement_type, summary, ccar_num, start_date, end_date} = req.body;
    let sql = `
    INSERT INTO project (
        project_name, 
        project_type,
        contractor_id,
        branch,
        requirement_type, 
        summary, 
        ccar_num,
        start_date,
        end_date) 
    VALUES (
        "${project_name}",
        "${project_type}",
        "${contractor_id}",
        "${branch}",
        "${requirement_type}", 
        "${summary}", 
        "${ccar_num}",
        "${start_date}",
        "${end_date}"
        )`;
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

// Get a Project with user email
router.get('/userId/:userId', (req, res) => {
    let sql = `
    SELECT * 
    FROM user_project_link upl
    INNER JOIN view_project vp ON vp.id = upl.project_id
    WHERE upl.user_id = ${req.params.userId}
    ORDER BY upl.project_id ASC
    `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Get a project with Project ID
router.get('/:projectid', (req, res) => {
    let sql = `
    SELECT * 
    FROM view_project
    WHERE id = ${req.params.projectid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });

});

// Grabbing all of the project information
router.get('/schedule/:projectid', (req, res) => {
    let sql = `
    SELECT 
        id as ID, 
        task_name as "Name", 
        duration as "Duration", 
        start_date as "Start", 
        finish_date as "End", 
        predecessors as "Predecessors"
    FROM 
        project_information 
    WHERE 
        project_id = ${req.params.projectid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

module.exports = router;
  