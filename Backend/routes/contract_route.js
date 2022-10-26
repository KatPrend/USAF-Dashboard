const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    let sql = `
    SELECT * 
    FROM contract_award`
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

router.post('/', (req, res) => {
    // const {project_id, contract_num, contract_status, requirement_plan, draft_rfp_released, approved_by_acb, rfp_released, proposal_received, tech_eval_comp, negotiation_comp, awarded} = req.body;
    // let contractAward = `
    // INSERT INTO 
    //     contract_award (
    //         project_id, 
    //         contract_num, 
    //         contract_status
    //         ) 
    //     VALUES (
    //         "${project_id}",
    //         "${contract_num}",
    //         "${contract_status}")`;

    const {contractAwardID, timelineStatus, requirementPlan, draftRFPRelesased, approvedACB, rfpRelreased, proposalRecived, techEvalComplete, negotationComplete, awarded} = req.body;
    let contractAward = `
    INSERT INTO contract_award_timeline(
        contract_award_id,
        timeline_status,
        requirement_plan, 
        draft_rfp_released,
        approved_by_acb,
        rfp_released,
        proposal_received,
        tech_eval_comp,
        negotiation_comp,
        awarded
    )
    VALUES (
        ${contractAwardID},
        ${timelineStatus},
        ${requirementPlan},
        ${draftRFPRelesased},
        ${approvedACB},
        ${rfpRelreased},
        ${proposalRecived},
        ${techEvalComplete},
        ${negotationComplete},
        ${awarded}
    )`;

        
    db.query(contractAward, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });

    console.log(req.body);

    // let contractTimeLine = `
    // INSERT INTO 
    //     contract_award_timeline (
    //         contract_award_id,
    //         timeline_status, 
    //         requirement_plan, 
    //         draft_rfp_released, 
    //         approved_by_acb, 
    //         rfp_released, 
    //         proposal_received, 
    //         tech_eval_comp, 
    //         negotiation_comp, 
    //         awarded) 
    //     VALUES (
    //         "${contract_award_id}",
    //         "${timeline_status}", 
    //         "${requirement_plan}", 
    //         "${draft_rfp_released}", 
    //         "${approved_by_acb}", 
    //         "${rfp_released}", 
    //         "${proposal_received}", 
    //         "${tech_eval_comp}", 
    //         "${negotiation_comp}", 
    //         "${awarded}")`;

    // db.query(contractTimeLine, (err, results) =>{
    //     if(err){
    //         throw err
    //     }
    //     res.send(results)
    // });

});

router.put("/updateContract/:contractid/newStatus/:newStatus", (req, res)=>{
    let sql = `
    UPDATE contract_award 
    SET contract_status = ${req.params.newStatus}
    WHERE id = ${req.params.contractid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete contract endpoint"})
});

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
    });
});

router.get('/daysAdded', (req, res) => {
    let sql =`
    SELECT *
    FROM contract_days_added`;

    db.query(sql, (err, results) => {
        if(err){
            throw err
        };
        res.send(results);
    });
});

module.exports = router;