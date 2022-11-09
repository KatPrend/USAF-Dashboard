const express = require("express");
const router = express.Router()

var db = require('../database');

// Get Expenditures for a project
router.get('/getExpen/:project_id', (req, res) => {
    let sql = `
    SELECT 
        id,
        DATE_FORMAT(expen_funding_date,'%m/%d/%y') as date,
        expen_projected as Projected, 
        expen_projected_total as "Projected Total", 
        expen_actual as Actual, 
        expen_actual_total as "Actual Total" 
    FROM view_expenditure 
    WHERE project_id=${req.params.project_id}
    ORDER BY date`;
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

//Get Total Expenditure For all Awarded Projects
router.get('/getTotalExpenditure/:userid', (req, res) => {
    let sql = `
    SELECT 
        SUM(expen_projected) as "Planned Expenditure",
        SUM(expen_actual) as "Actual Expenditure"
    FROM view_expenditure ve
    JOIN user_project_link upl on ve.project_id = upl.project_id
    JOIN contract_award ca on upl.project_id = ca.project_id
    JOIN users u on upl.user_id = u.id
    WHERE u.id = ${req.params.userid} AND ca.contract_status = 2 AND (SELECT DATEDIFF((SELECT CURDATE()), ve.expen_funding_date)) >= 0`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Get ADMIN Total Expenditure For all Awarded Projects
router.get('/getAdminTotalExpenditure', (req, res) => {
    let sql = `
    SELECT 
        SUM(expen_projected) as expen_projected,
        SUM(expen_actual) as expen_actual
    FROM view_expenditure ve
    JOIN contract_award ca on ve.project_id = ca.project_id
    WHERE ca.contract_status = 2 AND (SELECT DATEDIFF((SELECT CURDATE()), ve.expen_funding_date)) >= 0`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;