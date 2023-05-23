const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    type: String,
    password: String
});

module.exports = mongoose.model("users", userSchema);