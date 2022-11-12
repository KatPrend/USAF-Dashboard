const express = require("express");
const router = express.Router()

var db = require('../database');

//Get a List of all dependencies
router.get('/', (req, res) => {
    let sql = `
    SELECT * 
    FROM project_milestone_dependency`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

//Make a new Dependency
router.post('/', (req, res) => {
    const {predecessor_project, predecessor_milestone, successor_project, successor_milestone} = req.body;
    let sql = `
    INSERT INTO project_milestone_dependency (
        predecessor_project, 
        predecessor_milestone,
        successor_project,
        successor_milestone
        ) 
    VALUES (
        ${predecessor_project},
        ${predecessor_milestone},
        ${successor_project},
        ${successor_milestone}
        )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    //console.log(req.body);
});

// Update Dependency Link
router.put("/", (req, res)=>{
    const {predecessor_project, predecessor_milestone, successor_project, successor_milestone} = req.body;
    let sql = `
    UPDATE project_milestones
    SET
        predecessor_project = "${predecessor_project}",
        predecessor_milestone =  "${predecessor_milestone}",
        successor_project = "${successor_project}",
        successor_milestone =  "${successor_milestone}"
     `;
     let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

//Remove a Milestone Dependency
router.delete('/removeDependency', (req, res) => {
    const {predecessor_project,
        predecessor_milestone,
        successor_project,
        successor_milestone} = req.body;
    let sql = `
    DELETE FROM project_milestone_dependency
    WHERE 
        predecessor_project = ${predecessor_project} AND 
        predecessor_milestone = ${predecessor_milestone} AND 
        successor_project = ${successor_project} AND 
        successor_milestone = ${successor_milestone}`

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

//Get All Inner Project Dependencies
router.get('/getDependecies/:projectID', (req, res) => {
    let sql = `
    SELECT * FROM project_milestone_dependency
    WHERE predecessor_project = ${req.params.projectID} AND successor_project = ${req.params.projectID}`

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});




//Grab Successor
router.get('/successor/:projectId', (req, res) => {
    let sql = `
    SELECT 
        pmd.predecessor_project,
        p1.project_name as predecessor_name,
        pmd.predecessor_milestone,
        pm1.task_name as predecessor_task_name,
        pm1.end_date as predecessor_task_end_date,
        
        pmd.successor_project,
        p2.project_name as succ_proj_name,
        pmd.successor_milestone,
        pm2.task_name as successor_task_name,
        pm2.start_date as successor_task_start_date
	
    FROM project_milestone_dependency pmd

    INNER JOIN project p1 ON p1.id = pmd.predecessor_project
    INNER JOIN project_milestones pm1 ON pm1.id = pmd.predecessor_milestone

    INNER JOIN project p2 ON p2.id = pmd.successor_project
    INNER JOIN project_milestones pm2 ON pm2.id = pmd.successor_milestone

    WHERE pmd.predecessor_project = ${req.params.projectId} 
    AND pmd.predecessor_project != pmd.successor_project`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

//Grab Predecessor
router.get('/predecessor/:projectId', (req, res) => {
    let sql = `
    SELECT
        pmd.predecessor_project,
        p1.project_name as predecessor_name,
        pmd.predecessor_milestone,
        pm1.task_name as predecessor_task_name,
        pm1.end_date as predecessor_task_end_date,
        
        pmd.successor_project,
        p2.project_name as dep_proj_name,
        pmd.successor_milestone,
        pm2.task_name as successor_task_name,
        pm2.start_date as successor_task_start_date
	
    FROM project_milestone_dependency pmd

    INNER JOIN project p1 ON p1.id = pmd.predecessor_project
    INNER JOIN project_milestones pm1 ON pm1.id = pmd.predecessor_milestone

    INNER JOIN project p2 ON p2.id = pmd.successor_project
    INNER JOIN project_milestones pm2 ON pm2.id = pmd.successor_milestone

    WHERE pmd.successor_project = ${req.params.projectId} 
    AND pmd.predecessor_project != pmd.successor_project
    `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

// Get Project Successor's from a userID
router.get('/userSuccessor/:userid', (req, res) => {

    let sql = `
	SELECT
        p.project_name as pred_proj_name,
        pm.task_name as pred_name,
        pm.start_date as pred_start,
        pm.end_date as pred_end,
        
        p2.project_name as succ_proj_name,
        pm1.task_name as succ_name,
        pm1.start_date as succ_start,
        pm1.end_date as succ_end
    FROM project p
    INNER JOIN project_milestones pm ON pm.project_id = p.id
    INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project != pmd.successor_project    
    INNER JOIN project p2 ON p2.id = pmd.successor_project
    INNER JOIN project_milestones pm1 ON pm1.id = pmd.successor_milestone
    WHERE p.id IN (SELECT project_id FROM user_project_link WHERE user_id = ${req.params.userid})`;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
        // console.log(res);
    });

});

// Get Red user Project Dependencies
router.get('/redUserDependencies/:userid', (req, res) => {

    let sql = `
	SELECT COUNT(*) as count
    FROM
    (
    SELECT
        DATEDIFF(pm1.start_date,pm.end_date) as date_difference
        
        FROM project p
        INNER JOIN project_milestones pm ON pm.project_id = p.id
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project != pmd.successor_project    
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
router.get('/yellowUserDependencies/:userid', (req, res) => {

    let sql = `
	SELECT COUNT(*) as count
    FROM
    (
    SELECT
        DATEDIFF(pm1.start_date,pm.end_date) as date_difference
        
        FROM project p
        INNER JOIN project_milestones pm ON pm.project_id = p.id
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project != pmd.successor_project    
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
router.get('/greenUserDependencies/:userid', (req, res) => {

    let sql = `
	SELECT COUNT(*) as count
    FROM
    (
    SELECT
        DATEDIFF(pm1.start_date,pm.end_date) as date_difference
        
        FROM project p
        INNER JOIN project_milestones pm ON pm.project_id = p.id
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project != pmd.successor_project    
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
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project != pmd.successor_project    
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
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project != pmd.successor_project    
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
        INNER JOIN project_milestone_dependency pmd ON pmd.predecessor_milestone = pm.id AND pmd.predecessor_project != pmd.successor_project    
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

// Get Internal Project Dependencies for Ganntt Chart
router.get('/internalDependencies/:projectId', (req, res) => {
    let sql = `
    SELECT 
        pmd.predecessor_project,
        p1.project_name as predecessor_name,
        pmd.predecessor_milestone,
        pm1.task_name as predecessor_task_name,
        pm1.end_date as predecessor_task_end_date,
        pmd.successor_project,
        p2.project_name as dep_proj_name,
        pm2.task_name as successor_task_name,
        pm2.start_date as successor_task_start_date
        
    FROM project_milestone_dependency pmd
    INNER JOIN project p1 ON p1.id = pmd.predecessor_project
    INNER JOIN project_milestones pm1 ON pm1.id = pmd.predecessor_milestone
    INNER JOIN project p2 ON p2.id = pmd.successor_project
    INNER JOIN project_milestones pm2 ON pm2.id = pmd.successor_milestone
    WHERE pmd.predecessor_project = ${req.params.projectId}
    AND pmd.predecessor_project = pmd.successor_project`;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});


router.get('/successorDateDifference/:projectId', (req, res) => {
    // let sql = `
    // SELECT
    //     p.project_name as predescessor_name,
    //     p.end_date,
    //     DATEDIFF((SELECT start_date FROM project where id = ${req.params.projectId}),p.end_date) as date_difference
    // FROM dependency_table d
    // INNER JOIN project p  ON p.id =  d.successor
    // WHERE d.dependency = ${req.params.projectId} `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

router.get('/dependencyDateDifference/:projectId', (req, res) => {
    // let sql = `
    // SELECT
    //     p.project_name as predescessor_name,
    //     p.start_date,
    //     DATEDIFF(p.start_date, (SELECT start_date FROM project where id = ${req.params.projectId})) as date_difference
    // FROM dependency_table d
    // INNER JOIN project p  ON p.id =  d.dependency
    // WHERE d.successor = ${req.params.projectId} `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

// Update Milestones
router.put("/updateMilestone/", (req, res)=>{
    const {predecessor_project, predecessor_milestone, successor_project, successor_milestone} = req.body;
    let sql = `
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });    
});

module.exports = router;