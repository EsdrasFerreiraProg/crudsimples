const mongoose = require('mongoose');
require('dotenv').config();

const mongoPath = process.env.PROCESS_URL_MONGO;

module.exports = async () => {
    
    await mongoose.connect(mongoPath, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  return mongoose;
}