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
    const key = req.params.key;

    await mongo().then(async (mongoose)=>{
        try{
            const users = await userSchema.findOne({key});

            register = users;

            if(register != "" && register != null){
                res.status(200).json(register);
                logger.info("Got the user with key " + key + " successfully");

            }else{
                logger.error("Could not get the specified user: " + key + " successfully");
                res.status(200).json({message: "Could not get the specified user with key: " + key});
            }

        }catch(e){
            
            logger.error("Could not get the specified user: " + key + " successfully, error" + e);
        }

        console.log(users);
        
    })

  
})

router.post('/api/users', async (req, res)=>{
    const { v4: uuidv4 } = require('uuid');
    let uuidNumber = uuidv4();

    const password = generator.generate({
        length: 25,
        numbers: true,
        lowercase: true,
        symbols: true,
        uppercase: true
    });

    try{
        var encryptedPassword = await bcrypt.hash(password, 10).then(function(hash) {
            return hash;
        });

    }catch(err){
        logger.error("Error generating encrypted password " + err);
    }

    let {name, type} = req.body;
    
    await mongo().then(async (mongoose)=>{
        try{
        
            await new userSchema({
                key: uuidNumber,
                value:{
                    name,
                    type: type,
                    encryptedPassword
                },
    
            }).save()
            
            .then(logger.info("User saved successfully"));
            
        }catch(e){
            logger.error("Error while registering user: " + e);
        }
    })
    res.status(200).json({message: "User created successfully"});

});

router.put('/api/users', async (req, res) => {


    try{
        var {key, name, type} = req.body;

    }catch(err){
        logger.error("Error occured when destructuring the body objetct: " + err);
        res.status(500).send({message: "Error occured when destructuring the body object: " + err});
        return;
    }

    const value = {
        value:{
            name,
            type
        }
    }

    await mongo().then(async (mongoose)=>{
        try{
            const users = await userSchema.findOneAndUpdate({key}, value);


            if (users.value.name == name){
                res.status(500).json({type: "Failure", message: "Error occured when updating the user with key: " + key + " users are the same (no changing)"});
            }else{

                res.status(200).json("User with key: " + key + " updated successfully");
            }

        }catch(e){
            logger.error("Could not update the user with key " + key + "successfully");
            res.status(500).send({message: "Error occured when updating the user with key: " + key});
        }
        
    })
   
    
});

router.delete('/api/users/delete/:key', async (req, res) => {
    const key = req.params.key;

    await mongo().then(async (mongoose)=>{
        try{
            const user = await userSchema.findOneAndDelete({key});


            if (user == "" || user == null || user == undefined){
                res.status(500).json("User with key: " + key + " was not deleted successfully");
            }else{
                res.status(200).json("User with key: " + key + " deleted successfully");
                logger.info("User with key: " + key + "and user: " + user + " deleted successfully");

            }

        }catch(e){
            logger.error("Could not delete the user with key " + key + "successfully");
        }
        
    })
   
});
const path = require('path');

router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname + "/pages/example.html"));
});

router.get('/css/example.css', (req,res)=>{
    res.sendFile(path.join(__dirname + "/css/example.css"));
});

module.exports = router;

