'use strict';
const { secretKey } = require('../../../config/keys')

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    User = mongoose.model('User');

exports.getProfileData = (req, res) => {
    let { authorization } = req.headers;
    const [, userToken] = authorization.split(' ');

    jwt.verify(userToken, secretKey, (err, verifiedToken) => {
        if (err)
            return res.status(401).json({ tokenError: "Invalid or expired JWT token" });
        const { _id: userID } = verifiedToken;
        User.findOne({
            _id: userID,
        }, (err, user) => {

            if (err) // Error from MongoDB
                return res.status(500).json({ generalError: "Internal error querying MongoDB database" })
            if (!user) // User no longer exists in database
                return res.status(404).json({ user: "User not found " })

            user = user.toJSON();
            return res.json({
                fullName: user.fullName,
                username: user.username,
                email: user.email,
            });
        })
    })
};

exports.setFullName = (req, res) => {
    let { authorization } = req.headers;
    const [, userToken] = authorization.split(' ');

    jwt.verify(userToken, secretKey, (err, verifiedToken) => {
        if (err)
            return res.status(401).json({ tokenError: "Invalid or expired JWT token" });
        const { _id: userID } = verifiedToken;
        User.findOne({
            _id: userID,
        }, (err, user) => {

            if (err) // Error from MongoDB
                return res.status(503).json({ generalError: "Internal error querying MongoDB database" })
            if (!user) // User no longer exists in database
                return res.status(404).json({ user: "User not found " })

            user.fullName = req.body.fullName;
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.status(505).json({
                        generalError: "Internal error saving user to MongoDB database"
                    });
                } 
                return res.json({ message: "Full Name Changed!" })
            });
        })
    })
}

exports.setUsername = (req, res) => {

}

exports.setEmail = (req, res) => {
    let { authorization } = req.headers;
    const [, userToken] = authorization.split(' ');

    jwt.verify(userToken, secretKey, (err, verifiedToken) => {
        if (err)
            return res.status(401).json({ tokenError: "Invalid or expired JWT token" });
        const { _id: userID } = verifiedToken;
        User.findOne({
            _id: userID,
        }, (err, user) => {

            if (err) // Error from MongoDB
                return res.status(503).json({ generalError: "Internal error querying MongoDB database" })
            if (!user) // User no longer exists in database
                return res.status(404).json({ user: "User not found " })

            user.email = req.body.email;
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.status(505).json({
                        generalError: "Internal error saving user to MongoDB database"
                    });
                } 
                return res.json({ message: "Email Changed!" })
            });
        })
    })
}


