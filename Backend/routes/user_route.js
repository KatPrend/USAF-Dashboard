const express = require("express");
const { user } = require("../config");
const router = express.Router()

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
    const {contractor_id, user_name, user_role, user_email, mil_job_title_id} = req.body;
    let sql = `
    INSERT INTO users (
        contractor_id,
        user_name,
        user_role,
        user_email,
        mil_job_title_id) 
    VALUES (
        "${contractor_id}",
        "${user_name}",
        "${user_role}", 
        "${user_email}", 
        "${mil_job_title_id}"
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

// Adding a IPT Member 
router.post('/newIPT', (req, res) => {
    const {user_name, user_email, mil_job_title_id} = req.body;
    let sql = `
    INSERT INTO users(
        user_name,
        user_role,
        user_email,
        mil_job_title_id
    ) VALUES(
        ${user_name},
        2,
        ${user_email},
        ${mil_job_title_id}
    )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

// Adding an Admin
router.post('/newAdmin', (req, res) => {
    const {user_name, user_email} = req.body;
    let sql = `
    INSERT INTO users(
        user_name,
        user_role,
        user_email
    ) VALUES(
        ${user_name},
        3,
        ${user_email}
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
router.put("/changeUserRole/:userid/role/:userRole/jobTitle/:jobTitle", (req, res)=>{
    let sql = `
    UPDATE users 
    SET 
        user_role = ${req.params.userRole}, 
        mil_job_title = ${req.params.jobTitle}
    WHERE id = ${req.params.userid} `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

//Delete User
router.delete("/:userid", (req, res)=>{
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

// Grabbing all mil job titles
router.get('/milJobs', (req, res) => {
    let sql = `
    SELECT * FROM military_job_titles`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// get military job titles that are not in use
router.get('/milJobs/notInUse', (req, res) => {
    let sql = `
    SELECT * 
    FROM military_job_titles m
    WHERE m.id NOT IN(SELECT DISTINCT(u.mil_job_title_id)
    FROM users u
    WHERE u.mil_job_title_id IS NOT NULL);`
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//New Mill Job Title
router.post('/newMilJob/:newJob', (req, res) => {
    let sql = `
    INSERT INTO military_job_titles(
        mil_job_title
    ) VALUES (
        '${req.params.newJob}'
    )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Update Mil Job title table

router.delete('/removeMilJob/:milid', (req, res) => {
    let sql = `
    DELETE FROM military_job_titles
    WHERE id = '${req.params.milid}'`;
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
        project_id,
        mil_job_title_id
    ) VALUES (
        ${user_id},
        ${project_id},
        ${mil_job_title_id}
    )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Remove IPT Member from UPL
router.delete('/removeUPL', (req, res) => {
    const {user_id, project_id} = req.body;
    let sql = `
    DELETE FROM user_project_link
    WHERE user_id = ${user_id} AND project_id = ${project_id}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

//Adding Admin to EVery Project
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

module.exports = router;