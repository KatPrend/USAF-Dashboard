const express = require("express");
const router = express.Router()

var db = require('../database');

//Get all Contract Awards
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

//Add a new Contract Award
router.post('/', (req, res) => {

    const {project_id, contract_num, contract_status, indep_cost_est} = req.body;
    let contractAward = `
    INSERT INTO contract_award(
        project_id,
        contract_num,
        contract_status, 
        indep_cost_est
    )
    VALUES (
        "${project_id}",
        "${contract_num}",
        "${contract_status}",
        "${indep_cost_est}"
    )`;
        
    db.query(contractAward, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results);
    });

});

//Add a new Contract Timeline
router.post('/contractTimeline', (req, res) => {
    const {contract_award_id, requirement_plan, draft_rfp_released, approved_by_acb, rfp_released, proposal_received, tech_eval_comp, negotiation_comp, awarded} = req.body;
    let contractTimeLine = `
    INSERT INTO 
        contract_award_timeline (
            contract_award_id,
            timeline_status, 
            requirement_plan, 
            draft_rfp_released, 
            approved_by_acb, 
            rfp_released, 
            proposal_received, 
            tech_eval_comp, 
            negotiation_comp, 
            awarded) 
        VALUES 
        (
            "${contract_award_id}",
            "Planned", 
            "${requirement_plan}", 
            "${draft_rfp_released}", 
            "${approved_by_acb}", 
            "${rfp_released}", 
            "${proposal_received}", 
            "${tech_eval_comp}", 
            "${negotiation_comp}", 
            "${awarded}"
        );
        INSERT INTO 
        contract_award_timeline (
            contract_award_id,
            timeline_status
            ) 
        VALUES 
        (
            "${contract_award_id}",
            "Projected"
        ),
        (
            "${contract_award_id}",
            "Actual"
        )
        `;

    db.query(contractTimeLine, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });

});

// Updating a Contract Status
router.put("/:contractid", (req, res)=>{
    
    const {contract_status} = req.body;

    let sql = `
    UPDATE contract_award 
    SET contract_status = ${contract_status}
    WHERE id = ${req.params.contractid}`;
    
    db.query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Deleting a Contract Value
router.delete("/:contractid", (req, res)=>{
    let sql = `
    DELETE FROM contract_award
    WHERE id = ${req.params.contractid}`;
    
    db.query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Get Contract AwardTimeline by Project IDs
router.get('/contractawardtimeline/:project_id', (req, res) => {
    let sql = `
    SELECT 
        cat.id,
        cat.timeline_status,
        cat.requirement_plan, 
        cat.draft_rfp_released,
        cat.approved_by_acb, 
        cat.rfp_released,
        cat.proposal_received,
        cat.tech_eval_comp, 
        cat.negotiation_comp, 
        cat.awarded	
    FROM contract_award ca
    INNER JOIN contract_award_timeline cat ON cat.contract_award_id = ca.id
    WHERE project_id = ${req.params.project_id}
    `;
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
    FROM contract_days_added
    `;

    db.query(sql, (err, results) => {
        if(err){
            throw err
        };
        res.send(results);
    });
});

module.exports = router;