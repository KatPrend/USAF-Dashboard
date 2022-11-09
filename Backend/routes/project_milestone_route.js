const express = require("express");
const router = express.Router()

var db = require('../database');

// Grabbing all the Project Schedule for a project
router.get('/schedule/:projectId', (req, res) => {
    
    let sql = `
    SELECT 
        pm.id as ID,
        pm.project_id,
        pm.task_name as "Name",
        DATEDIFF(pm.end_date,pm.start_date) as "Duration",
        pm.start_date as "ProjectedStart",
        pm.end_date as "ProjectedEnd",
        pm.actual_start as "ActualStart",
        pm.actual_end as "ActualEnd",        
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
	WHERE pm.project_id = ${req.params.projectId}
    `

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

//Get all Milestones for a project
router.get('/:projectID', (req, res) => {
    let sql = `
    SELECT * FROM project_milestones
    WHERE project_id = ${req.params.projectID}`

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

//Make a new Project Milestone
router.post('/', (req, res) => {
    const {project_id, task_name, start_date, end_date} = req.body;
    let sql = `
    INSERT INTO project_milestones(
        project_id,
        task_name,
        start_date,
        end_date
    ) VALUES (
        ${project_id}, 
        "${task_name}",
        "${start_date}",
        "${end_date}"
    )`

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});


// Update a project milestone
router.put('/', (req, res) => {
    const {milestone_id, project_id, task_name, projected_start, projected_end, actual_start, actual_end} = req.body;
    let sql = `
    UPDATE project_milestones
    SET
        project_id = "${project_id}",
        task_name =  "${task_name}",
        start_date = "${projected_start}",
        end_date =  "${projected_end}"
        ${actual_start !== null ? ',actual_start = "' + actual_start + '"'  : ""}
        ${actual_end !== null ? ',actual_end = "' + actual_end + '"'  : ""}
    WHERE id = "${milestone_id}"
        `

        console.log(sql);
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });

});

//Remove a Project Milestone
router.delete('/:milestoneID', (req, res) => {
    let sql = `
    DELETE FROM project_milestones
    WHERE id = ${req.params.milestoneID}`

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

module.exports = router;