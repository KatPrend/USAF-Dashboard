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

router.get('/expenditure/:project_id', (req, res) => {
    let sql = `
    SELECT 
        DATE_FORMAT(expen_funding_date,'%y-%m-%d') as date, 
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

//Funding Data

router.get('/allFundingTypes', (req, res) => {
    let sql = `
    SELECT * 
    FROM funding_types`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

router.post('/postNewFundingType/:project_id/newFundingType/:newfunding', (req, res) => {
    let sql = `
    INSERT INTO funding_types(
        funding_type
    )
    VALUES(
        ${req.params.newfunding}
    )`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
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


module.exports = router;