const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    let sql = 
    `
    SELECT * 
    FROM clin_data
    `

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.post('/', (req, res) => {
    const {clin_num, project_id, clin_type, clin_scope, proj_clin_value} = req.body;
    let sql = 
    `INSERT INTO clin_data 
        (clin_num, 
        project_id, 
        clin_type, 
        clin_scope, 
        proj_clin_value) 
    VALUES 
        ("${clin_num}",
        "${project_id}",
        "${clin_type}", 
        "${clin_scope}", 
        "${proj_clin_value}")`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })

    console.log(req.body);
});

router.put("put/:clinID", (req, res)=>{
    const {clin_num, project_id, clin_type, clin_scope, proj_clin_value} = req.body;
    let sql = 
    `
    UPDATE clin_data 
    SET 
        clin_num = "${clin_num}", 
        project_id = "${project_id}", 
        clin_type = "${clin_type}", 
        clin_scope = "${clin_scope}", 
        proj_clin_value = "${proj_clin_value}"
    WHERE
        id = ${clinID}
    `;
    
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
})

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete clin endpoint"})
})

// Get Clin by projectid
router.get('/:project_id', (req, res) => {
    let sql = `
    SELECT * FROM 
        clin_data 
    WHERE project_id = "${req.params.project_id}"
    `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
  });

module.exports = router;