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

router.post('/:newbranch', (req, res) => {
    let sql = `
    INSERT INTO branches(
        branch_name
    ) VALUES(
        '${req.params.newbranch}'
    )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
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