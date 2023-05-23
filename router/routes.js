const express = require('express');
const router = express.Router();
const mongo = require('../mongo/mongo.js');
const userSchema = require('../mongo/schema.js');
require('dotenv').config();
const logger = require("../logger/logger.js");

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

    res.status(200).json(register);
})

router.post('/api/users', async (req, res)=>{

    let {name, type, password} = req.body;

    await mongo().then(async (mongoose)=>{
        try{
        
            await new userSchema({
                name: name,
                type: type,
                password: password
    
            }).save()
            .then(logger.info("User saved successfully"))
            
    
        }catch(e){
            logger.error("Error while registering user: " + e);
        }
    })
    res.status(200).json({message: "User created successfully"});

})

module.exports = router;