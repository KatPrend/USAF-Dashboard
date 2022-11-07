const express = require("express");
const router = express.Router()

var db = require('../database');

// Get Obligation plan for a project
router.get('/:project_id', (req, res) => {
    let sql = `
    SELECT 
        DATE_FORMAT(obli_funding_date,'%m/%d/%y') as date, 
        obli_funding_type as FundingType, 
        obli_fiscal_year as "FiscalYear", 
        obli_projected as Projected, 
        obli_projected_total as "Projected Total", 
        obli_actual as Actual, 
        obli_actual_total as "Actual Total" 
    FROM view_obligation 
    WHERE project_id=${req.params.project_id}
    ORDER BY date`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Get Obligation Table Plan for a project 
router.get('/obligation_table/:project_id', (req, res) => {
    let sql = `
    SELECT 
        DATE_FORMAT(obli_funding_date,'%m/%d') as date, 
        obli_funding_type as FundingType, 
        obli_fiscal_year as "FiscalYear",
        obli_projected as Projected, 
        obli_projected_total as "Projected Total",
        obli_actual as "Actual", 
        obli_actual_total as "Actual Total" 
    FROM 
        view_obligation 
    WHERE 
        project_id=${req.params.project_id}
    ORDER BY date`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Get Total Obligation For all Awarded Projects
router.get('/getTotalObligation/:userid', (req, res) => {
    let sql = `
    SELECT 
	    SUM(obli_projected) as "Planned Obligation",
        SUM(obli_actual) as "Actual Obligation"
    FROM view_obligation vo
    JOIN user_project_link upl on vo.project_id = upl.project_id
    JOIN contract_award ca on upl.project_id = ca.project_id
    JOIN users u on upl.user_id = u.id
    WHERE u.id = ${req.params.userid} AND ca.contract_status = 2 AND (SELECT DATEDIFF((SELECT CURDATE()), vo.obli_funding_date)) >= 0`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;