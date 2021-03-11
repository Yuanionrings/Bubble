const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const users = require('./routes/api/users')
const app = express()

// Configuring dotenv
dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('[SERVER] MongoDB successfully connected'))

// Activate Bodyparser for routes to accept JSON
app.use(express.json())
app.use(cors())

// Routes Configuration
app.use('/api/users', users)

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('[SERVER] Server is up and running on port ' + port);
});

