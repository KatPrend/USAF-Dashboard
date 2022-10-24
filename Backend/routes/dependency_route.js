const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    let sql = `
    SELECT * 
    FROM dependency`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.post('/', (req, res) => {
    const {successor, dependency} = req.body;
    let sql = `
    INSERT INTO dependency_table (
        successor, 
        dependency
        ) 
    VALUES (
        "${successor}",
        "${dependency}"
        )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

router.put("/", (req, res)=>{
    res.send({message:"TODO: Make an update clin endpoint"})
});

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete clin endpoint"})
});

router.get('/grabDepend/:projectid', (req, res) => {
    let sql = `
    SELECT dependency 
    FROM dependency_table 
    WHERE successor = ${req.params.projectid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

router.get('/grabSuccesor/:projectid', (req, res) => {
    let sql = `
    SELECT successor 
    FROM dependency_table 
    WHERE dependency = ${req.params.projectid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

router.get('/successorDates/:projectid', (req, res) => {
    let sql = `
    SELECT
        p.start_date,
        p.end_date
    FROM dependency_table d
    INNER JOIN project p  ON p.id = d.successor
    WHERE d.dependency = ${req.params.projectid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

router.get('/dependencyDates/:projectid', (req, res) => {
    let sql = `
    SELECT
        p.start_date,
        p.end_date
    FROM dependency_table d
    INNER JOIN project p  ON p.id = d.dependency
    WHERE d.successor = ${req.params.projectid}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});


router.get('/successorDateDifference/:projectid', (req, res) => {
    let sql = `
    SELECT
        p.project_name as predescessor_name,
        p.end_date,
        DATEDIFF((SELECT start_date FROM project where id = ${req.params.projectid}),p.end_date) as date_difference
    FROM dependency_table d
    INNER JOIN project p  ON p.id =  d.successor
    WHERE d.dependency = ${req.params.projectid} `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});

router.get('/dependencyDateDifference/:projectid', (req, res) => {
    let sql = `
    SELECT
        p.project_name as predescessor_name,
        p.start_date,
        DATEDIFF(p.start_date, (SELECT start_date FROM project where id = ${req.params.projectid})) as date_difference
    FROM dependency_table d
    INNER JOIN project p  ON p.id =  d.dependency
    WHERE d.successor = ${req.params.projectid} `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)

    });
});


module.exports = router;