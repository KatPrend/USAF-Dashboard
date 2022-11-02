const express = require("express");
const router = express.Router()

var db = require('../database');

// Get Expenditures for a project
router.get('/:project_id', (req, res) => {
    let sql = `
    SELECT 
        DATE_FORMAT(expen_funding_date,'%m/%d/%y') as date, 
        expen_funding_type as FundingType, expen_fiscal_year as "FiscalYear", 
        expen_projected as Projected, expen_proj_total as "Projected Total", 
        expen_actual as Actual, expen_actual_total as "Actual Total" 
    FROM expenditure_funding_data 
    WHERE project_id=${req.params.project_id}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Update Expenditure
router.put('/', (req, res) => {
    const {expenID, projectID, expen_funding_date, expen_projected, expen_actual} = req.body;
    let sql = `
    UPDATE expenditure_funding_data
    SET
        project_id = ${projectID},
        expen_funding_date = "${expen_funding_date}",
        expen_projected = ${expen_projected},
        expen_actual = ${expen_actual}
    WHERE id = ${expenID}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Make a new Expenditure 
router.post('/', (req, res) => {
    const {
        project_id, 
        expen_funding_date, 
        expen_projected,
        expen_actual
    } = req.body;
    let sql = `
    INSERT INTO expenditure_funding_data(
        project_id,
        expen_funding_date,
        expen_projected,
        expen_actual
    ) VALUES(
        ${project_id},
        "${expen_funding_date}"
        ${expen_projected},
        ${expen_actual}
    )`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Delete Expenditure
router.delete('/:expenID', (req, res) => {
    let sql = `
    DELETE FROM expenditure_funding_data 
    WHERE id = ${req.params.expenID}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;