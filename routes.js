const express = require('express');
const router = express.Router();
const mongo = require('./mongo/mongo.js');
const userSchema = require('./mongo/schema.js');
require('dotenv').config();
const logger = require("./logger/logger.js");
const generator = require('generate-password');
const bcrypt = require('bcrypt');

router.get('/api/users', async (req, res)=>{
    let register = "";
    
    await mongo().then(async (mongoose)=>{
        try{
            const users = await userSchema.find();

            register = users;

            if(register != ""){
                logger.info("Got all users successfully");
            }
        }catch(e){
            logger.error("Could not get all users successfully");
        }
        
    })

    res.status(500).json(register);
})

router.get('/api/users/:key', async (req, res)=>{
    let register = "";

    await mongo().then(async (mongoose)=>{
        try{
            const users = await userSchema.findOne({key: req.params.key});

            register = users;

            if(register != ""){
                logger.info(`Got the desired user ${register.value.nome} successfully`);
            }
        }catch(e){
            logger.error("Could not get all users successfully");
        }
        
    })

    res.status(500).json(register);
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

