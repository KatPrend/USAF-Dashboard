const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    res.send({message:"TODO: Make an get contract endpoint"})
});

router.post('/', (req, res) => {
    const {project_id, contract_num, contract_status, requirement_plan, draft_rfp_released, approved_by_acb, rfp_released, proposal_received, tech_eval_comp, nego_comp, awarded} = req.body;
    let sql = `INSERT INTO contract_award (project_id, contract_num, contract_status, requirement_plan, draft_rfp_released, approved_by_acb, rfp_released, proposal_received, tech_eval_comp, nego_comp, awarded) VALUES ("${project_id}","${contract_num}","${contract_status}", "${requirement_plan}", "${draft_rfp_released}", "${approved_by_acb}", "${rfp_released}", "${proposal_received}", "${tech_eval_comp}", "${nego_comp}", "${awarded}")`;
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

module.exports = router;