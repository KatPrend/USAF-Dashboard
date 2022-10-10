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

module.exports = router;