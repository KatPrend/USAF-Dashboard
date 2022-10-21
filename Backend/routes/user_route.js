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
    let sql = `INSERT INTO users (contractor_company,userName,userRole,userEmail,mil_job_title) VALUES ("${contractor_company}","${userName}","${userRole}", "${userEmail}", "${mil_job_title}")`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

router.put("/", (req, res)=>{
    res.send({message:"TODO: Make an update user endpoint"})
})

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete user endpoint"})
})

router.get('/iptmembers/:project_id', (req, res) => {
    let sql = `SELECT u.mil_job_title, u.userName FROM users u inner join user_project_link upl on upl.user_id = u.id WHERE upl.project_id = ${req.params.project_id}  AND u.userRole ='IPT Member' AND u.userRole != 'Admin'`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
})

router.get('/iptmembers/:project_id/:job_title', (req, res) => {
    let sql = `SELECT u.mil_job_title, u.userName FROM users u inner join user_project_link upl on upl.user_id = u.id WHERE upl.project_id = ${req.params.project_id} AND u.mil_job_title=${req.params.job_title}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
})

module.exports = router;