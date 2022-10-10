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


module.exports = router;