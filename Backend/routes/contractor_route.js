const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    let sql = `
    SELECT * 
    FROM contractor
    `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

router.post('/', (req, res) => {
    const {contractor_name, summary} = req.body;
    let sql = `
    INSERT INTO contractor (
        contractor_name, 
        summary
        ) 
    VALUES (
        "${contractor_name}",
        "${summary}"
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
})

router.delete("/:contractor_id", (req, res)=>{

    let sql = `
    DELETE FROM contractor
    WHERE id = "${req.params.contractor_id}"
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
})


router.get('/noproject', (req, res)=>{

    let sql = `
    SELECT * 
    FROM contractor c
    WHERE c.id NOT IN(SELECT DISTINCT(p.contractor_id)
    FROM project p)
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});


module.exports = router;