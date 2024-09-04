const express = require('express');
const router = express.Router();
const mongo = require('./mongo/mongo.js');
const userSchema = require('./mongo/schema.js');
require('dotenv').config();
const logger = require("./logger/logger.js");
const generator = require('generate-password');
const bcrypt = require('bcrypt');

router.get('/api/users', async (req, res)=>{
    
})

router.get('/api/users/:key', async (req, res)=>{
 
})

router.post('/api/users', async (req, res)=>{

});

router.put('/api/users', async (req, res) => {

});

router.delete('/api/users/delete/:key', async (req, res) => {
    
});
const path = require('path');

router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname + "/pages/example.html"));
});

router.get('/css/example.css', (req,res)=>{
    res.sendFile(path.join(__dirname + "/css/example.css"));
});

module.exports = router;

