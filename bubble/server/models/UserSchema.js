// Sign up schema - what to collect from user
const mongoose = require('mongoose')

//Defines mongoose schema for user accounts
const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', UserSchema)