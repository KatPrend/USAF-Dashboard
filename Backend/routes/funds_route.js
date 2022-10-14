const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    res.send({message:"TODO: Make an get funds endpoint"})
});

router.post('/', (req, res) => {
    res.send({message:"TODO: Make an post funds endpoint endpoint"})
});

router.put("/", (req, res)=>{
    res.send({message:"TODO: Make an update funds endpoint"})
})

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete funds endpoint"})
})

router.get('/obligation/:project_id', (req, res) => {
    let sql = `SELECT * FROM project_funding_data WHERE project_id=${req.params.project_id}`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});


module.exports = router;