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
    let sql = `SELECT SUM(curr_obli_actual) FROM project_funding_data WHERE project_id = ${project_id}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

router.get('/expenditure/:project_id', (req, res) => {
    let sql = `SELECT DATE_FORMAT(expen_funding_date,'%y-%m-%d') as date, expen_funding_type as FundingType, expen_projected as Projected, expen_proj_total as "Projected Total", expen_actual as Actual, expen_actual_total as "Actual Total" FROM expenditure_funding_data WHERE project_id=${req.params.project_id}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

router.get('/obligation/:project_id', (req, res) => {
    let sql = `SELECT DATE_FORMAT(obli_funding_date,'%y-%m-%d') as date, obli_funding_type as FundingType, obli_projected as Projected, obli_proj_total as "Projected Total", obli_actual as Actual, obli_actual_total as "Actual Total" FROM obligation_funding_data WHERE project_id=${req.params.project_id}`;
    let query = db.query(sql, (err, results)=>{
        if(err){obli
            throw err
        }
        res.send(results)
    });
});


module.exports = router;