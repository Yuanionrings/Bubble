'use strict';
const { secretKey } = require('../../../config/keys')

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    Event = mongoose.model('Event');

exports.createEvent = function (req, res) {
    let { authorization } = req.headers;
    const [, userToken] = authorization.split(' ');

    // Parse data, TODO: do this on the client side in a controller because it's cluttered here
    let { eventName, eventDate: date, startTime: start, endTime: end } = req.body;
    let [ddd, mmm, dd, yyyy] = date.split(' ');
    let [, , , , startTime] = start.split(' ');
    startTime = startTime.split(':')[0] + ":" + startTime.split(':')[1];
    let [, , , , endTime] = end.split(' ');
    endTime = endTime.split(':')[0] + ":" + endTime.split(':')[1];
    let eventDate = `${ddd} ${mmm} ${dd} ${yyyy}`;

    jwt.verify(userToken, secretKey, (err, verifiedToken) => {
        if (err)
            return res.status(401).json({ tokenError: "Invalid or expired JWT token" });
        const { _id: userID } = verifiedToken;
        Event.findOne({
            userID, // Make sure no event exists already by this user with the same event name
            eventName,
        }, (err, event) => {
            if (err) // Error from MongoDB
                return res.status(500).json({ generalError: "Internal error querying MongoDB database", ...err })
            if (event) // Event with same user ID and same eventName found
                return res.status(409).json({ eventName: `You already have an event with this name` })

            // If we get here we are all good to save our event
            let newEvent = new Event({
                userID,
                eventName,
                eventDate,
                startTime,
                endTime,
            });
            newEvent.save((err, event) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        generalError: "Internal server error saving event to MongoDB database", ...err
                    });
                } else {
                    return res.json(event);
                }
            });
        })
    })
};
