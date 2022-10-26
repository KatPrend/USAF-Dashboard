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

router.delete("/", (req, res)=>{
    const contractor_id = req.body;
    console.log(contractor_id);

    let sql = `
    DELETE FROM contractor
    WHERE id = "${contractor_id}"
    `;

    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
})


module.exports = router;