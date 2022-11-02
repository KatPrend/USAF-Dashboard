const express = require("express");
const router = express.Router()

var db = require('../database');


//Get Approved Funding for a project
router.get('/:projectID', (req,res) => {
    let sql = `
    SELECT * FROM approved_funding
    WHERE project_id = ${req.params.projectID}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Post into Approved Funding
router.post('/', (req,res) => {
    const {
        project_id, 
        appro_funding_type, 
        appro_fiscal_year, 
        approved_amount
    } = req.body;
    let sql = `
    INSERT INTO approved_funding(
        project_id,
        appro_funding_type,
        appro_fiscal_year,
        approved_amount
    ) VALUES(
        ${project_id},
        ${appro_funding_type},
        "${appro_fiscal_year}",
        ${approved_amount}
    )`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Update Approved Funding
router.put('/', (req, res) => {
    const {approvedID, projectID, appro_funding_type, appro_fiscal_year, approved_amount} = req.body;
    let sql = `
    UPDATE approved_funding
    SET
        project_id = ${projectID},
        appro_funding_type = "${appro_funding_type}",
        appro_fiscal_year = "${appro_fiscal_year}",
        approved_amount = ${approved_amount}
    WHERE id = ${approvedID}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Delete Approved Funding
router.delete('/:id', (req,res) => {
    let sql = `
    DELETE FROM approved_funding
    WHERE id = ${req.params.id}`;
    
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;