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
router.get('/userEmail/:userEmail', (req, res) => {
    let sql = `
    SELECT 
        u.id as user_id,
        p.id as project_id, 
        p.project_name, 
        ca.contract_num, 
        ca.contract_status, 
        p.branch, 
        ca.contract_value, 
        p.dependency_status, 
        p.financial_status, 
        p.schedule_status 
    FROM users u 
    INNER JOIN 
        user_project_link upl on upl.user_id = u.id 
    INNER JOIN 
        project p on p.id = upl.project_id 
    LEFT JOIN
        contract_award ca on ca.project_id = p.id 
    WHERE 
        u.userEmail = '${req.params.userEmail}'`;
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
    SELECT 
        p.id, 
        p.project_name, 
        c.contractor_name, 
        ca.contract_num, 
        ca.contract_status, 
        p.branch, 
        p.requirement_type, 
        p.summary 
    FROM 
        project p 
    INNER JOIN 
        contract_award ca ON ca.project_id = p.id 
    INNER JOIN 
        contractor c ON c.id = p.contractor_id 
    WHERE 
        p.id = ${req.params.projectid}`;
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
        startDate as "Start", 
        finishDate as "End", 
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
  