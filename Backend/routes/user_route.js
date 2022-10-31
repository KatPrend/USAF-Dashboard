const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    let sql = 'SELECT * FROM users'
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.post('/', (req, res) => {
    const {contractor_company, userName, userRole, userEmail, mil_job_title} = req.body;
    let sql = `
    INSERT INTO users (
        contractor_company,
        user_name,
        user_role,
        user_email,
        mil_job_title) 
    VALUES (
        "${contractor_company}",
        "${userName}",
        "${userRole}", 
        "${userEmail}", 
        "${mil_job_title}"
        )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

//Incase the user is put into the system wrong
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

// router.post()

router.delete("/deleteUser/:userid", (req, res)=>{
    // let sql = `
    // DELETE 
    // FROM users 
    // WHERE id = ${req.params.userid}`;
    let sql = `
    DELETE FROM user_project_link
    WHERE user_id = ${req.params.userid};
    DELETE FROM users
    WHERE id = ${req.params.userid};
    DELETE FROM users
    WHERE id = ${req.params.userid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

router.get('/iptmembers/:project_id', (req, res) => {
    let sql = `
    SELECT 
        u.id, 
        u.mil_job_title_id, 
        u.user_name 
    FROM users u 
    INNER JOIN user_project_link upl on upl.user_id = u.id 
    WHERE upl.project_id = ${req.params.project_id}  
    AND u.user_role ='IPT Member' AND u.user_role != 'Admin'`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

router.get('/iptmembers/:project_id/jobTitle/:job_title', (req, res) => {
    let sql = `
    SELECT 
        u.id, 
        u.mil_job_title_id, 
        u.user_name 
    FROM users u 
    INNER JOIN user_project_link upl on upl.user_id = u.id 
    WHERE upl.project_id = ${req.params.project_id} 
    AND u.mil_job_title_id=${req.params.job_title}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Get a user role from user email
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
router.get('/userId/:userId', (req, res) => {
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

// Mil Job Titles
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

module.exports = router;