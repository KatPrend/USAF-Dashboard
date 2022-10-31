const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    let sql = `
    SELECT * 
    FROM project`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.post('/', (req, res) => {
    const {project_name, project_type, contractor_id,  branch_id, requirement_type_id, summary, ccar_num, start_date, end_date} = req.body;
    let sql = `
    INSERT INTO project ( 
        project_name,  
        project_type,  
        contractor_id, 
        branch_id, 
        requirement_type_id, 
        summary, 
        ccar_num,
        start_date, 
        end_date
        )
        
    VALUES (
        "${project_name}",
        "${project_type}",
        "${contractor_id}",
        "${branch_id}",
        "${requirement_type_id}", 
        "${summary}", 
        "${ccar_num}",
        "${start_date}",
        "${end_date}"
        )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

router.put('/:projectid', (req, res)=>{
    const {project_name, project_type, contractor_id,  branch_id, requirement_type_id, summary, ccar_num, start_date, end_date} = req.body;    
    
    let sql = `
    UPDATE project
    SET
        project_name = "${project_name}",
        project_type = "${project_type}",  
        contractor_id =  "${contractor_id}",
        branch_id = "${branch_id}",
        requirement_type_id = "${requirement_type_id}", 
        summary = "${summary}",
        ccar_num = "${ccar_num}",
        start_date =  "${start_date}",
        end_date = "${end_date}"
    WHERE id = ${req.params.projectid};  
    `
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

router.delete("/:projectid", (req, res)=>{
    let sql = `
    DELETE FROM project
    WHERE id = ${req.params.projectid}`;

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

// Get a project with Project ID
router.get('/:projectid', (req, res) => {
    let sql = `
    SELECT * 
    FROM view_project
    WHERE id = ${req.params.projectid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });

});

// Grabbing all of the project information
router.get('/schedule/:projectid', (req, res) => {
    
    let sql = `
    SELECT 
        pm.id as ID,
        pm.task_name as "Name",
        DATEDIFF(pm.end_date,pm.start_date) as "Duration",
        pm.start_date as "Start",
        pm.end_date as "End",
        
        (
	        SELECT 
	        GROUP_CONCAT(predecessor_milestone SEPARATOR ',' ) 
	        FROM project_milestone_dependency  pmd
	        WHERE pmd.successor_milestone = pm.id
	        AND pmd.predecessor_project = pmd.successor_project
        ) as "Predecessors",
        (
	        SELECT 
	        GROUP_CONCAT(pm1.task_name SEPARATOR ',' ) 
	        
	        FROM project_milestone_dependency  pmd
	        INNER JOIN project_milestones pm1 ON pm1.id = pmd.predecessor_milestone
	        WHERE pmd.successor_milestone = pm.id
	        AND pmd.predecessor_project = pmd.successor_project
        ) as "Predecessors_Name"
        
	FROM project_milestones pm
	WHERE pm.project_id = ${req.params.projectid}
    `

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

//Branch End Points
router.get('/branches', (req, res) => {
    let sql = `
    SELECT * 
    FROM branches`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.post('/newBranch/:newbranch', (req, res) => {
    let sql = `
    INSERT INTO bracnhes(
        branch_name
    ) VALUES(
        ${req.params.newbranch}
    )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.delete('/removeBranch/:branchid', (req, res) => {
    let sql = `
    DELETE FROM branches
    WHERE id = ${req.params.branchid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.post('/milestone', (req, res) => {
    let sql = `
    INSERT INTO bracnhes(
        branch_name
    ) VALUES(
        ${req.params.newbranch}
    )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});


module.exports = router;
  