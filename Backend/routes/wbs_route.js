const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    res.send({message:"TODO: Make an get wbs endpoint"})
});

router.post('/', (req, res) => {
    res.send({message:"TODO: Make an post wbs endpoint endpoint"})
});

router.put("/", (req, res)=>{
    res.send({message:"TODO: Make an update wbs endpoint"})
})

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete wbs endpoint"})
})

router.get('project/:project_id', (req, res) => {
    res.send({message:"TODO: Make an get wbs endpoint"})
});

router.get('project/:project_id/clin/:clin_id', (req, res) => {
    res.send({message:"TODO: Make an get wbs endpoint"})
});

module.exports = router;