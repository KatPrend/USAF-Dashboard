const express = require("express");
const router = express.Router()

var db = require('../database');

//Grabbing all WBS's
router.get('/', (req, res) => {
    let sql = `
    SELECT *
    FROM task_resource_table
    `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Grab all WBS's for a project
router.get('/:project_id', (req, res) => {
    let sql = `
    SELECT *
    FROM task_resource_table
    WHERE project_id = ${req.params.project_id}
    `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Grab a CLIN's WBS
router.get('/project/:project_id/clin/:clin_id', (req, res) => {
    let sql = `
    SELECT *
    FROM task_resource_table
    WHERE clin_num = ${req.params.clin_id}
    AND project_id = ${req.params.project_id}
    `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;