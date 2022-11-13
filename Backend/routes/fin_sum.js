const express = require("express");
const router = express.Router()

var db = require('../database');

//GET Financial SUmmary Breakpoints
router.get('/', (req, res) => {
    let sql = `
    SELECT * FROM financial_summary_breakpoints`;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Update Financial Summary Breakpoints
router.put('/', (req, res) => {
    const {obli_yellow_breakpoint, obli_red_breakpoint, expen_yellow_breakpoint, expen_red_breakpoint} = req.body;
    let sql = `
    UPDATE financial_summary_breakpoints
    SET 
        obli_yellow_breakpoint = ${obli_yellow_breakpoint},
        obli_red_breakpoint = ${obli_red_breakpoint},
        expen_yellow_breakpoint = ${expen_yellow_breakpoint},
        expen_red_breakpoint = ${expen_red_breakpoint}`;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;