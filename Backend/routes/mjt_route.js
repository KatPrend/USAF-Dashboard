const express = require("express");
const router = express.Router();

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

//Remove Mil Job
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