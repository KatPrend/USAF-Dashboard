const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    let sql = `
    SELECT * 
    FROM contractor`
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.post('/', (req, res) => {
    const {project_id, contract_num, contract_status, requirement_plan, draft_rfp_released, approved_by_acb, rfp_released, proposal_received, tech_eval_comp, negotiation_comp, awarded} = req.body;
    let sql = `
    INSERT INTO 
        contract_award (
            project_id, 
            contract_num, 
            contract_status, 
            requirement_plan, 
            draft_rfp_released, 
            approved_by_acb, 
            rfp_released, 
            proposal_received, 
            tech_eval_comp, 
            negotiation_comp, 
            awarded) 
        VALUES (
            "${project_id}",
            "${contract_num}",
            "${contract_status}", 
            "${requirement_plan}", 
            "${draft_rfp_released}", 
            "${approved_by_acb}", 
            "${rfp_released}", 
            "${proposal_received}", 
            "${tech_eval_comp}", 
            "${negotiation_comp}", 
            "${awarded}")`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

router.put("/", (req, res)=>{
    res.send({message:"TODO: Make an update contract endpoint"})
})

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete contract endpoint"})
})

router.get('/contractaward/:project_id', (req, res) => {
    // let sql = `SELECT contract_award_id, project_id, contract_num, contract_status, DATE_FORMAT(requirement_plan,'%y-%m-%d'), DATE_FORMAT(draft_rfp_released,'%y-%m-%d'), DATE_FORMAT(approved_by_acb,'%y-%m-%d'), DATE_FORMAT(rfp_released,'%y-%m-%d'), DATE_FORMAT(proposal_received,'%y-%m-%d'), DATE_FORMAT(tech_eval_comp,'%y-%m-%d'), DATE_FORMAT(negotiation_comp,'%y-%m-%d'), DATE_FORMAT(awarded,'%y-%m-%d') FROM contract_award WHERE project_id = ${req.params.project_id}`;
    let sql = `
    SELECT * 
    FROM contract_award 
    WHERE project_id = ${req.params.project_id}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
})

module.exports = router;