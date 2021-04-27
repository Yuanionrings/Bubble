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

            let { fullName, username, email } = user.toJSON();
            return res.json({ fullName, username, email })
        })
    })
};

exports.changeAnyField = (req, res, mustbeUnique) => {
    let { authorization } = req.headers;
    const [, userToken] = authorization.split(' ');
    let { changing, changingTo } = req.body.change;

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

            if (changing != "identifier" && user[changing] === changingTo || changing === "identifier" && changingTo === user["username"])
                return res.json({ message: "Nothing Happened" });

            let fieldNotUnique = false;
            User.findOne({
                [changing]: changingTo
            }, (err, user) => {
                if (err)
                    return res.status(500).json({ generalError: "Internal error querying MongoDB database" })
                if (user)
                    fieldNotUnique = true;
            })
            if (mustbeUnique && fieldNotUnique)
                return res.status(409).json({ [changing]: `A user already exists where ${changing} = ${changingTo}` })

            changing === "identifier" && (user["username"] = changingTo)
            user[changing] = changingTo;
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        generalError: "Internal error saving user to MongoDB database"
                    });
                }
                return res.json({ success: `${changing} Changed!` })
            });
        })
    })
}

exports.changeProfileData = (req, res) => {
    if (req.body.change.changing === "email")
        exports.changeAnyField(req, res, false);
    if (req.body.change.changing === "identifier")
        exports.changeAnyField(req, res, true);
    if (req.body.change.changing === "fullName")
        exports.changeAnyField(req, res, false);
}


