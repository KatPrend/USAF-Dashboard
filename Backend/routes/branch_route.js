const express = require("express");
const router = express.Router()

var db = require('../database');

//Branch End Points
router.get('/', (req, res) => {
    let sql = `
    SELECT *
    FROM branches`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

// get branches not associated with a project
router.get('/noproject', (req, res) => {
    let sql = `
    SELECT *
    FROM branches b
    WHERE b.id NOT IN(SELECT DISTINCT(p.branch_id) 
    FROM project p
    WHERE p.branch_id IS NOT NULL)`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

// Making a new branch
router.post('/', (req, res) => {
    const {branch_name} = req.body;

    let sql = `
    INSERT INTO branches(
        branch_name
    ) VALUES(
        '${branch_name}'
    )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Update a branch
router.put('/:branchid', (req, res) => {
    const {branch_name} = req.body;

    let sql = `
    UPDATE branches
    SET branch_name = $
    WHERE id = ${req.params.branchid}`;;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Delete a branch
router.delete('/:branchid', (req, res) => {
    let sql = `
    DELETE FROM branches
    WHERE id = ${req.params.branchid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

module.exports = router;