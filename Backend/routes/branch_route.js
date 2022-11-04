const express = require("express");
const router = express.Router()

var db = require('../database');

//Branch End Points

// get branches not associated with a project
router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
    const {branch_name} = req.body;

    let sql = `
    INSERT INTO branches(
        branch_name
    ) VALUES(
        '${req.params.branch_name}'
    )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

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