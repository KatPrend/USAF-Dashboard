const express = require("express");
const router = express.Router();

var db = require('../database');

// Get All users
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM users'
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

//Create New User
router.post('/', (req, res) => {
    const {contractor_id, user_name, user_role, user_email} = req.body;
    let sql = `
    INSERT INTO users (
        contractor_id,
        user_name,
        user_role,
        user_email) 
    VALUES (
        "${contractor_id}",
        "${user_name}",
        "${user_role}", 
        "${user_email}"
        )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

// Adding a Contractor
router.post('/newContractor', (req, res) => {
    const {contractor_id, user_name, user_email} = req.body;
    let sql = `
    INSERT INTO users(
        contractor_id,
        user_name,
        user_role,
        user_email
    ) VALUES(
        "${contractor_id}",
        "${user_name}",
        1,
        "${user_email}"
    )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

//Update User Role
router.put("/changeUserRole/:userid/role/:userRole/", (req, res)=>{
    let sql = `
    UPDATE users 
    SET 
        user_role = '${req.params.userRole}'
    WHERE id = '${req.params.userid}'`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

//Delete User
router.delete("/del/:userid", (req, res)=>{
    let sql = `
    DELETE 
    FROM users 
    WHERE id = ${req.params.userid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// IPT Member by Project ID
router.get('/iptmembers/:project_id', (req, res) => {
    let sql = `
    SELECT 
        u.id, 
        mjt.mil_job_title, 
        u.user_name 
    FROM users u 
    INNER JOIN user_project_link upl on upl.user_id = u.id
    INNER JOIN military_job_titles mjt on upl.mil_job_title_id = mjt.id
    WHERE upl.project_id = ${req.params.project_id} AND upl.mil_job_title_id IS NOT NULL
    ORDER BY upl.mil_job_title_id`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Get project by user email
router.get('/userEmail/:userEmail', (req, res) => {
    let sql = `
    SELECT *
    FROM users u 
    WHERE u.user_email = '${req.params.userEmail}'`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Get a user role from user id
router.get('/userRole/:userId', (req, res) => {
    let sql = `
    SELECT *
    FROM users u 
    WHERE u.id = '${req.params.userId}'`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Adding User to User Project Link
router.post('/addToUPL', (req,res) => {
    const {user_id,project_id, mil_job_title_id} = req.body;
    let sql = `
    INSERT INTO user_project_link(
        user_id,
        project_id
        ${mil_job_title_id !== undefined ? ",mil_job_title_id" : ""}
    ) VALUES (
        ${user_id},
        ${project_id}
        ${mil_job_title_id !== undefined ? ',' + mil_job_title_id: ""}
    )`;
    console.log(sql);
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Remove IPT Member from UPL
router.delete('/removeUPL/:userId/:projectId', (req, res) => {
    let sql = `
    DELETE FROM user_project_link
    WHERE user_id = ${req.params.userId} AND project_id = ${req.params.projectId}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Adding Admin to EVery Project  
//Useless for now
router.post('/addAdminUPL/:userID', (req,res) => {
    let sql = `
    INSERT INTO user_project_link
    SELECT ${req.params.userID}, id, NULL FROM project`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Get All IPT Members attached to a project 
// For IPT Drop down
router.get('/getIPTMembersAttached/:projectID', (req, res) => {
    let sql = `
    SELECT * FROM user_project_link upl
    INNER JOIN users u on upl.user_id = u.id
    WHERE upl.project_id = ${req.params.projectID} AND u.user_role != 1`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Grabs all contractors associated to a contract company
router.get('/contractorUsers/:conID', (req, res) => {
    let sql = `
    SELECT 
        u.*
    FROM users u 
    INNER JOIN contractor c on c.id = u.contractor_id
    WHERE u.contractor_id = ${req.params.conID}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Grab all contractors that are NOT associated to a project
router.get('/conNotActive', (req, res) => {
    let sql = `
    SELECT * FROM contractor
    WHERE id NOT IN 
    (
        SELECT DISTINCT 
            contractor_id
        FROM project
    )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Grab all contractors associated to a project
router.get('/conProject/:projectID', (req, res) => {
    let sql = `
    SELECT 
        u.*
    FROM users u
    INNER JOIN user_project_link upl on u.id = upl.user_id
    INNER JOIN view_project vp on vp.id = upl.project_id
    WHERE vp.id = ${req.params.projectID} AND u.user_role = 1
    `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;