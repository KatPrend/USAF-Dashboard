const express = require("express");
const router = express.Router()

var db = require('../database');

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

router.post('/', (req, res) => {
    res.send({message:"TODO: Make an post wbs endpoint endpoint"})
});

router.put("/", (req, res)=>{
    res.send({message:"TODO: Make an update wbs endpoint"})
})

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete wbs endpoint"})
})

router.get('project/:project_id', (req, res) => {
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

router.get('project/:project_id/clin/:clin_id', (req, res) => {
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