const express = require("express");
const router = express.Router()

var db = require('../database');

//Get a List of all Projects
router.get('/', (req, res) => {
    let sql = `
    SELECT * 
    FROM view_project`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

//Make a new Project
router.post('/', (req, res) => {
    const {project_name, project_type, contractor_id,  branch_id, requirement_type_id, summary, ccar_num} = req.body;
    let sql = `
    INSERT INTO project ( 
        project_name,  
        project_type,  
        contractor_id, 
        branch_id, 
        requirement_type_id, 
        summary, 
        ccar_num
        )
        
    VALUES (
        "${project_name}",
        "${project_type}",
        "${contractor_id}",
        "${branch_id}",
        "${requirement_type_id}", 
        "${summary}", 
        "${ccar_num}"
        )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

//Update a project
router.put('/:projectId', (req, res)=>{
    const {project_name, project_type, contractor_id,  branch_id, requirement_type_id, summary, ccar_num} = req.body;    
    
    let sql = `
    UPDATE project
    SET
        project_name = "${project_name}",
        project_type = ${project_type},  
        contractor_id =  ${contractor_id},
        branch_id = ${branch_id},
        requirement_type_id = ${requirement_type_id}, 
        summary = "${summary}",
        ccar_num = "${ccar_num}"
    WHERE id = ${req.params.projectId}`
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Delete a project
router.delete("/:projectId", (req, res)=>{
    let sql = `
    DELETE FROM project
    WHERE id = ${req.params.projectId}`;

    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
})

// Get Projects with user Id
router.get('/userId/:userId', (req, res) => {
    let sql = `
    SELECT * 
    FROM user_project_link upl
    INNER JOIN view_project vp ON vp.id = upl.project_id
    WHERE upl.user_id = ${req.params.userId}
    ORDER BY upl.project_id ASC
    `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Get all information for a project
router.get('/:projectId', (req, res) => {
    let sql = `
    SELECT * 
    FROM view_project
    WHERE id = ${req.params.projectId}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });

});

module.exports = router;
  