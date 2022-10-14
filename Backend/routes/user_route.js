const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    res.send({message:"TODO: Make an get user endpoint"})
});

router.post('/', (req, res) => {
    res.send({message:"TODO: Make an post user endpoint endpoint"})
});

router.put("/", (req, res)=>{
    res.send({message:"TODO: Make an update user endpoint"})
})

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete user endpoint"})
})

router.get('/iptmembers/:project_id', (req, res) => {
    let sql = `SELECT u.mil_job_title, u.userName FROM users u inner join user_project_link upl on upl.user_id = u.user_id WHERE upl.project_id = ${req.params.project_id}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
})

router.get('/iptmembers/:project_id/:job_title', (req, res) => {
    let sql = `SELECT u.mil_job_title, u.userName FROM users u inner join user_project_link upl on upl.user_id = u.user_id WHERE upl.project_id = ${req.params.project_id} AND u.mil_job_title=${req.params.job_title}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
})

module.exports = router;