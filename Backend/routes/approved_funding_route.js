const express = require("express");
const router = express.Router()

var db = require('../database');


//Get Approved Funding for a project
router.get('/:projectID', (req,res) => {
    let sql = `
    SELECT * FROM approved_funding
    WHERE project_id = ${req.params.projectID}
    ORDER BY appro_fiscal_year`;
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
        "${appro_funding_type}",
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
        project_id = "${projectID}",
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

//Get Indepentent Cost Est and Projected Contract Value
router.get('/getEstimates/:id', (req,res) => {
    let sql = `
    SELECT 
        contract_value,
        ind_gov_est
    FROM view_contract_award
    WHERE project_id = ${req.params.id}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});
    

// Get Distinct Fiscal Years for a project
router.get('/fy/:projectID', (req,res) => {
    let sql = `
    SELECT DISTINCT(appro_fiscal_year) as FY
    FROM approved_funding
    WHERE project_id = ${req.params.projectID}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Get Distinct Approved Funding Types for a project
router.get('/fundingTypes/:projectID', (req,res) => {
    let sql = `
    SELECT DISTINCT(appro_funding_type) as fundingType
    FROM approved_funding
    WHERE project_id = ${req.params.projectID}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Get Distinct Approved Funding Types for a project
router.get('/total/:projectID', (req,res) => {
    const {funding_type, fiscal_year} = req.body;

    let sql = `
    SELECT 
	IFNULL(sum(af.approved_amount),0) as total_amount
    FROM approved_funding af
    INNER JOIN funding_types ft ON ft.id = af.appro_funding_type
    WHERE appro_funding_type = ${funding_type}
    AND appro_fiscal_year = ${fiscal_year}
    AND project_id = ${req.params.projectID}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});



module.exports = router;