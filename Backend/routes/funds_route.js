const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/gettotal/:project_id', (req, res) => {
    let sql = `
    SELECT SUM(curr_obli_actual) 
    FROM project_funding_data 
    WHERE project_id = ${project_id}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Get all Funding Types
router.get('/allFundingTypes', (req, res) => {
    let sql = `
    SELECT * 
    FROM funding_types
    WHERE status = 1`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Making new Funding Type
router.post('/postNewFundingType', (req, res) => {
    const {funding_type} = req.body;
    let sql = `
    INSERT INTO funding_types(
        funding_type
    )
    VALUES(
        "${funding_type}"
    )`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Deactive a Funding Type
router.put('/deactivateFundingType/:fundingid', (req, res) => {
    let sql = `
    UPDATE funding_types
    SET status = '0'
    WHERE id = '${req.params.fundingid}'`;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

//Deleting a Funding Type
router.delete('/removeFundingTypes/:fundingid', (req, res) => {
    let sql = `
    DELETE FROM funding_types
    WHERE id = ${req.params.fundingid}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Update a Funding Type
router.put('/updateFundingType/:id', (req,res) => {
    const {funding_type, status} = req.body;
    let sql = `
    UPDATE funding_types
    SET 
        funding_type = "${funding_type}",
        status = ${status}
    WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;