`use strict`;

const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 4000;

// Configuring dotenv
dotenv.config()

const option = { // Something for later maybe???? can be used in mongoose.connect as a parameter
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('[SERVER] MongoDB successfully connected'))

// Activate Bodyparser for routes to accept JSON
app.use(express.json())


app.use(cors())

// NEW NEW (GARN)

// Bodyparser middleware for routes to accept JSON

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors());

// Load Mongoose Models
require('./api/models/EventSchema'),


jsonwebtoken = require("jsonwebtoken");

/*
// Routes Configuration
//const UserRouter = require('./routes/api/users');
const UserRouter = require('./api/routes/userRoute');
app.use('/api/users', UserRouter);*/

require('./api/routes/authRoute')(app);
require('./api/routes/eventRoute')(app);
require('./api/routes/profileRoute')(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

// Start server
app.listen(port, () => {
    console.log('[SERVER] Server is up and running on port ' + port);
});

module.exports = app;