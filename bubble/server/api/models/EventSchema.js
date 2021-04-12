// Sign up schema - what to collect from user
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
    Schema = mongoose.Schema;

//Defines mongoose schema for user accounts
const EventSchema = new Schema({
    userID: {
        type: String,
        required: true,
        trim: true,
    },
    eventName: { // same as username, but always lowercase 
        type: String,
        required: true,
        trim: true,
    },
    eventDate:{
        type: String,
        trim: true,
        required: true,
    },
    startTime:{
        type: String,
        trim: true,
        required: true,
    },
    endTime:{
        type: String,
        trim: true,
        required: true,
    },
})

module.exports = mongoose.model('Event', EventSchema)