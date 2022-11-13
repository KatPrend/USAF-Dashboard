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

// //Get all Milestones for a project
// router.get('/:projectID', (req, res) => {
//     let sql = `
//     SELECT * FROM project_milestones
//     WHERE project_id = ${req.params.projectID}`

//     let query = db.query(sql, (err, results) =>{
//         if(err){
//             throw err
//         }
//         res.send(results)

//     });
// });

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
        task_name =  "${task_name}"
        ${projected_start !== null ? ',projected_start = "' + projected_start + '"'  : ""}
        ${projected_end !== null ? ',projected_end = "' + projected_end + '"'  : ""}
        ${actual_start !== null ? ',actual_start = "' + actual_start + '"'  : ""}
        ${actual_end !== null ? ',actual_end = "' + actual_end + '"'  : ""}
    WHERE id = "${milestone_id}"
    `
    console.log(sql);
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


// Get Red user Project Dependencies
router.get('/redUserSchedules/:userid', (req, res) => {

    let sql = `
	SELECT COUNT(*) as count
    FROM
    (
    SELECT
        DATEDIFF(pm1.start_date,pm.end_date) as date_difference
        
        FROM project p
        INNER JOIN project_milestones pm ON pm.project_id = p.id
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project = pmd.successor_project    
        INNER JOIN project p2 ON p2.id = pmd.successor_project
        INNER JOIN project_milestones pm1 ON pm1.id = pmd.successor_milestone
        WHERE p.id IN (SELECT project_id FROM user_project_link WHERE user_id = ${req.params.userid})
        AND DATEDIFF(pm1.start_date,pm.end_date) < 0
    ) T1 
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
        //console.log(res);
    });

});

// Get Yellow user Project Dependencies
router.get('/yellowUserSchedules/:userid', (req, res) => {

    let sql = `
	SELECT COUNT(*) as count
    FROM
    (
    SELECT
        DATEDIFF(pm1.start_date,pm.end_date) as date_difference
        
        FROM project p
        INNER JOIN project_milestones pm ON pm.project_id = p.id
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project = pmd.successor_project    
        INNER JOIN project p2 ON p2.id = pmd.successor_project
        INNER JOIN project_milestones pm1 ON pm1.id = pmd.successor_milestone
        WHERE p.id IN (SELECT project_id FROM user_project_link WHERE user_id = ${req.params.userid})
        AND DATEDIFF(pm1.start_date,pm.end_date) > 0
        AND DATEDIFF(pm1.start_date,pm.end_date) < 6
    ) T1 
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
        //console.log(res);
    });

});

// Get Green user Project Dependencies
router.get('/greenUserSchedules/:userid', (req, res) => {

    let sql = `
	SELECT COUNT(*) as count
    FROM
    (
    SELECT
        DATEDIFF(pm1.start_date,pm.end_date) as date_difference
        
        FROM project p
        INNER JOIN project_milestones pm ON pm.project_id = p.id
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project = pmd.successor_project    
        INNER JOIN project p2 ON p2.id = pmd.successor_project
        INNER JOIN project_milestones pm1 ON pm1.id = pmd.successor_milestone
        WHERE p.id IN (SELECT project_id FROM user_project_link WHERE user_id = ${req.params.userid})
        AND DATEDIFF(pm1.start_date,pm.end_date) > 5
    ) T1 
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
        //console.log(res);
    });

});

// Get Red user Project Dependencies
router.get('/redAdmin', (req, res) => {

    let sql = `
	SELECT COUNT(*) as count
    FROM
    (
    SELECT
        DATEDIFF(pm1.start_date,pm.end_date) as date_difference
        
        FROM project p
        INNER JOIN project_milestones pm ON pm.project_id = p.id
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project = pmd.successor_project    
        INNER JOIN project p2 ON p2.id = pmd.successor_project
        INNER JOIN project_milestones pm1 ON pm1.id = pmd.successor_milestone
        WHERE DATEDIFF(pm1.start_date,pm.end_date) < 0
    ) T1 
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
        //console.log(res);
    });

});

// Get Yellow user Project Dependencies
router.get('/yellowAdmin', (req, res) => {

    let sql = `
	SELECT COUNT(*) as count
    FROM
    (
    SELECT
        DATEDIFF(pm1.start_date,pm.end_date) as date_difference
        
        FROM project p
        INNER JOIN project_milestones pm ON pm.project_id = p.id
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project = pmd.successor_project    
        INNER JOIN project p2 ON p2.id = pmd.successor_project
        INNER JOIN project_milestones pm1 ON pm1.id = pmd.successor_milestone
        WHERE DATEDIFF(pm1.start_date,pm.end_date) > 0
        AND DATEDIFF(pm1.start_date,pm.end_date) < 6
    ) T1 
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
        //console.log(res);
    });

});

// Get Green user Project Dependencies
router.get('/greenAdmin', (req, res) => {

    let sql = `
	SELECT COUNT(*) as count
    FROM
    (
    SELECT
        DATEDIFF(pm1.start_date,pm.end_date) as date_difference
        
        FROM project p
        INNER JOIN project_milestones pm ON pm.project_id = p.id
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project = pmd.successor_project    
        INNER JOIN project p2 ON p2.id = pmd.successor_project
        INNER JOIN project_milestones pm1 ON pm1.id = pmd.successor_milestone
        WHERE DATEDIFF(pm1.start_date,pm.end_date) > 5
    ) T1 
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
        //console.log(res);
    });

});

//Get all Sch Sum Data for Admins
router.get('/adminSchSum', (req, res) => {

    let sql = `
	SELECT
        (SELECT COUNT(schedule_status) 
            FROM view_project
            WHERE schedule_status= 'ONTRACK') as green_sch,
        (SELECT COUNT(schedule_status) 
            FROM view_project
            WHERE schedule_status= 'BEHIND') as yellow_sch,
        (SELECT COUNT(schedule_status) 
            FROM view_project
            WHERE schedule_status= 'REALLY-BEHIND') as red_sch`;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Get all Sch Sum for users
router.get('/userSchSum/:userID', (req, res) => {

    let sql = `
	SELECT
        (SELECT COUNT(schedule_status) 
            FROM view_project vp
            INNER JOIN user_project_link upl on vp.id = upl.project_id
            WHERE schedule_status= 'ONTRACK' AND upl.user_id = ${req.params.userID}) as green_sch,
        (SELECT COUNT(schedule_status) 
            FROM view_project vp
            INNER JOIN user_project_link upl on vp.id = upl.project_id
            WHERE schedule_status= 'BEHIND' AND upl.user_id = ${req.params.userID}) as yellow_sch,
        (SELECT COUNT(schedule_status) 
            FROM view_project vp
            INNER JOIN user_project_link upl on vp.id = upl.project_id
            WHERE schedule_status= 'REALLY-BEHIND' AND upl.user_id = ${req.params.userID}) as red_sch`;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;