const express = require("express");
const router = express.Router()

var db = require('../database');

// Get all CLIN
router.get('/', (req, res) => {
    let sql = 
    `
    SELECT * 
    FROM view_clin
    ORDER BY clin_num
    `

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

// POST a CLIN
router.post('/', (req, res) => {
    const {clin_num, project_id, clin_type, clin_scope, ind_gov_est} = req.body;
    let sql = `
    INSERT INTO clin_data 
        (clin_num, 
        project_id, 
        clin_type, 
        clin_scope, 
        ind_gov_est) 
    VALUES (
        ${clin_num},
        ${project_id},
        "${clin_type}", 
        "${clin_scope}", 
        ${ind_gov_est})`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })

    console.log(req.body);
});

//Update a CLIN
router.put("/:clinid", (req, res)=>{
    const {clin_num, project_id, clin_type, clin_scope, ind_gov_est} = req.body;
    let sql = 
    `
    UPDATE clin_data 
    SET 
        clin_num = "${clin_num}", 
        project_id = "${project_id}", 
        clin_type = "${clin_type}", 
        clin_scope = "${clin_scope}", 
        ind_gov_est = "${ind_gov_est}"
    WHERE
        id = ${req.params.clinid}
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
})

//Delete a CLIN
router.delete("/:clinid", (req, res)=>{
    let sql = `
    DELETE FROM clin_data
    WHERE id = ${req.params.clinid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
})

// Get Clin by projectId
router.get('/:project_id', (req, res) => {
    let sql = `
    SELECT * FROM 
        view_clin
    WHERE project_id = "${req.params.project_id}"
    ORDER BY clin_num
    `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
  });



module.exports = router;