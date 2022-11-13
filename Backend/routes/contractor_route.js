const express = require("express");
const router = express.Router()

var db = require('../database');

//Get a list of all Contractors
router.get('/', (req, res) => {
    let sql = `
    SELECT * 
    FROM contractor
    `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Adding a new Contractor
router.post('/', (req, res) => {
    const {contractor_name, summary} = req.body;
    let sql = `
    INSERT INTO contractor (
        contractor_name, 
        summary
        ) 
    VALUES (
        "${contractor_name}",
        "${summary}"
        )`;
    db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

//Delete a Contractor
router.delete("/:contractor_id", (req, res)=>{

    let sql = `
    DELETE FROM contractor
    WHERE id = "${req.params.contractor_id}"
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

//Get Contractors with no Projects
router.get('/noproject', (req, res)=>{

    let sql = `
    SELECT * 
    FROM contractor c
    WHERE c.id NOT IN(
        SELECT DISTINCT(p.contractor_id) 
        FROM project p 
        WHERE p.contractor_id IS NOT NULL
        )
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});


module.exports = router;