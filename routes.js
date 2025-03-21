const express = require('express');
const router = express.Router();
const mongo = require('./mongo/mongo.js');
const userSchema = require('./mongo/schema.js');
require('dotenv').config();
const logger = require("./logger/logger.js");
const generator = require('generate-password');
const bcrypt = require('bcrypt');

router.get('/api/users', async (req, res)=>{

    let users;
    
    await mongo().then(async ()=>{
        try{
            const result = await userSchema.find();

            users = result; 
        
        }catch(e){
            logger.error(`Error when trying to find users, error: ${e}` );
            res.status(500).json({msg: "Error when trying to find users, error: " + e})
        }
    });
    
    if (!users){
        res.status(501).json({msg: "Users don't exist"});
    }else{
        res.status(200).json({users});
    }
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

