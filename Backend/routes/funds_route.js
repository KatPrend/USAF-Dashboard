const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    res.send({message:"TODO: Make an get funds endpoint"})
});

router.post('/', (req, res) => {
    res.send({message:"TODO: Make an post funds endpoint endpoint"})
});

router.put("/", (req, res)=>{
    res.send({message:"TODO: Make an update funds endpoint"})
});

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete funds endpoint"})
});

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

// ------------------ Obligation -------------------

router.get('/obligation/:project_id', (req, res) => {
    let sql = `
    SELECT 
        DATE_FORMAT(obli_funding_date,'%y-%m-%d') as date, 
        obli_funding_type as FundingType, 
        obli_fiscal_year as "FiscalYear", 
        obli_projected as Projected, 
        obli_proj_total as "Projected Total", 
        obli_actual as Actual, 
        obli_actual_total as "Actual Total" 
    FROM obligation_funding_data 
    WHERE project_id=${req.params.project_id}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

router.get('/obligation_table/:project_id', (req, res) => {
    let sql = `
    SELECT 
        DATE_FORMAT(obli_funding_date,'%m-%d') as date, 
        obli_funding_type as FundingType, 
        obli_fiscal_year as "FiscalYear",
        obli_projected as Projected, 
        obli_proj_total as "Projected Total",
        obli_actual as "Actual", 
        obli_actual_total as "Actual Total" 
    FROM 
        obligation_funding_data 
    WHERE 
        project_id=${req.params.project_id}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

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

<<<<<<< HEAD
router.post('/postNewFundingType', (req, res) => {
    const {newfunding} = req.body;
=======
router.post('/newFundingType/:newfunding', (req, res) => {
>>>>>>> 398364f9bf17373ee2fc59c75c9cb0904ca2e238
    let sql = `
    INSERT INTO funding_types(
        funding_type,
        status
    )
    VALUES(
<<<<<<< HEAD
        ${newfunding}
=======
        '${req.params.newfunding}',
        '1'
>>>>>>> 398364f9bf17373ee2fc59c75c9cb0904ca2e238
    )`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

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

router.put('/updateFundingType/:id/newFundingType/:newFunding', (req,res) => {
    // req.body here?
    let sql = `
    `;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// ------------------ Expenditure -------------------

router.get('/expenditure/:project_id', (req, res) => {
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
router.put('/updateExpenditure', (req, res) => {
    const {expenID, projectID, expen_funding_date, expen_projected, expen_actual} = req.body;
    let sql = `
    UPDATE expenditure_funding_data
    SET
        project_id = ${projectID},
        expen_funding_date = ${expen_funding_date},
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

//Post into Expenditure 
router.post('/newExpenditure', (req, res) => {
    const {
        project_id, 
        expen_funding_date, 
        expen_funding_type, 
        expen_fiscal_year, 
        expen_projected,
        expen_proj_total,
        expen_actual,
        expen_actual_total
    } = req.body;
    let sql = `
    INSERT INTO expenditure_funding_data(
        project_id,
        expen_funding_date,
    -- 	Comment these out when Copper is done with his work on the front end
        expen_funding_type,
        expen_fiscal_year,
    -- 	End of things need to be removed
        expen_projected,
        expen_proj_total,
        expen_actual,
        expen_actual_total
    ) VALUES(
        ${project_id},
        ${expen_funding_date},
        ${expen_funding_type},
        ${expen_fiscal_year},
        ${expen_projected},
        ${expen_proj_total},
        ${expen_actual},
        ${expen_actual_total}
    )`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Delete Expenditure
router.delete('/removeExpenditure/:expenID', (req, res) => {
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
// ------------------ Approved Funding -------------------

//Get Approved Funding for a project
router.get('/getApprovedFunding/:projectID', (req,res) => {
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
router.post('/newApprovedFunding', (req,res) => {
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
        ${appro_fiscal_year},
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
router.put('/updateApprovedFunding', (req, res) => {
    const {approvedID, projectID, appro_funding_type, appro_fiscal_year, approved_amount} = req.body;
    let sql = `
    UPDATE approved_funding
    SET
        project_id = ${projectID},
        appro_funding_type = ${appro_funding_type},
        appro_fiscal_year = ${appro_fiscal_year},
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
router.delete('/removeApprovedFunding/:id', (req,res) => {
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