'use strict';
const { secretKey } = require('../../../config/keys')

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User');

const exp = {};

exp.register = function (req, res) {
    let { username, password } = req.body;
    User.findOne({
        identifier: username 
    }, (err, user) => {
        if (err) // Error from MongoDB
            return res.status(500).json({ generalError: "Internal error querying MongoDB database" })
        if (user) // User not found
            return res.status(409).json({ resetField: false, username: "A user already exists with this username"})
        
        // If we get here we are all good to save our user
        let newUser = new User(req.body);
        newUser.hash_password = bcrypt.hashSync(password, 10);
        newUser.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    generalError: "Internal error saving user to MongoDB database"
                });
            } else {
                user.hash_password = undefined; // We don't even want to send the hash back in plaintext, because they can still use it to authenticate
                return res.json(user);          // when we send it upon login, it will be in a token
            }
        });
    }) 
};

exp.sign_in = function (req, res) {
    let { username, password } = req.body;
    User.findOne({ 
        identifier: username
    }, function (err, user) {
        if (err) // Error from MongoDB
            return res.status(500).json({ generalError: "Internal error querying MongoDB database" })
        if (!user) // User not found
            return res.status(404).json({ resetField: false, username: "Could not find a user with that username"})
        if (!user.comparePassword(password)) // Invalid credentials
            return res.status(401).json({ resetField: true, password: 'Authentication failed' });

        let plainObj = user.toJSON();
        delete plainObj.identifier, plainObj.date;
        
        jwt.sign(plainObj,
            secretKey,
            { expiresIn: 3600 }, // 1 hour
            (err, token) => {
                if (err) {
                    console.log(err);
                    return;
                }
                return res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            }
        );
        return;
    });
};


module.exports = exp;