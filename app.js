const express = require('express');
const app = express();
const PORT = 5000;

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require('./router/routes.js');

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(routes);
const logger = require("./logger/logger.js");


app.listen(PORT, (err)=>{
    logger.info(`Listening on port: ${PORT}`);

    if(err){
        logger.error(`Error on listening: ${err}`);
    }
})