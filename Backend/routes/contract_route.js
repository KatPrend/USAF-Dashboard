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

// get contract id from project id
router.get('/contractAward/:projectId', (req, res) => {
    let sql = `
    SELECT id
    FROM contract_award
    WHERE project_id = ${req.params.projectId}`
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
        contract_status
    )
    VALUES (
        "${project_id}",
        "${contract_num}",
        "${contract_status}"
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

//Update the days added to a Contract Award Timeline
router.put("/updateDaysAdded", (req, res)=>{
    const {draft_rfp_released, approved_by_acb,
        rfp_released, proposal_received, tech_eval_comp, negotiation_comp, awarded} = req.body;
    let sql = `
    UPDATE contract_days_added
    SET
        draft_rfp_released = ${draft_rfp_released},
        approved_by_acb = ${approved_by_acb},
        rfp_released = ${rfp_released},
        proposal_received = ${proposal_received},
        tech_eval_comp = ${tech_eval_comp},
        negotiation_comp = ${negotiation_comp},
        awarded = ${awarded} `;
    
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});


// Updating a Contract Status
router.put("/status/:contractid", (req, res)=>{
    const {contract_status} = req.body;

    let sql = `
    UPDATE contract_award 
    SET contract_status = "${contract_status}"
    WHERE id = ${req.params.contractid}`;
    
    db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//update a contract number
router.put("/contractNum/:contractid", (req, res)=>{
    
    const {contract_num} = req.body;

    let sql = `
    UPDATE contract_award 
    SET 
        contract_num = "${contract_num}"
    WHERE id = ${req.params.contractid}`;
    
    db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Updating a Contract Status
router.put("/:contractid", (req, res)=>{
    
    const {contract_num, contract_status, contract_value} = req.body;

    let sql = `
    UPDATE contract_award 
    SET 
        contract_num = "${contract_num}",
        contract_status = "${contract_status}",
        contract_value = "${contract_value}"
    WHERE id = ${req.params.contractid}`;
    
    db.query(sql, (err, results) =>{
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
    
    db.query(sql, (err, results) =>{
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
        cat.contract_award_id,
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

//Grab all of the days added for a Contract Award Timeline
router.get('/daysAdded', (req, res) => {
    let sql =`
    SELECT *
    FROM contract_days_added
    `;

    let query = db.query(sql, (err, results) => {
        if(err){
            throw err
        };
        res.send(results);
    });
});

//Update a Contract Timeline
router.put("/updateContractTimeline/:timelineID", (req, res)=>{
    const {contract_award_id, timeline_status,requirement_plan, draft_rfp_released, approved_by_acb,
        rfp_released, proposal_received, tech_eval_comp, negotiation_comp, awarded} = req.body;
    let sql = `
    UPDATE contract_award_timeline
    SET 
        contract_award_id = "${contract_award_id}",
        timeline_status = "${timeline_status}",
        requirement_plan = "${requirement_plan}",
        draft_rfp_released = "${draft_rfp_released}",
        approved_by_acb = "${approved_by_acb}",
        rfp_released = "${rfp_released}",
        proposal_received = "${proposal_received}",
        tech_eval_comp = "${tech_eval_comp}",
        negotiation_comp = "${negotiation_comp}",
        awarded = "${awarded}"	
    WHERE id = ${req.params.timelineID}`;
    
    db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;