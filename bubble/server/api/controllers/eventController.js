'use strict';
const { secretKey } = require('../../../config/keys');

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    Event = mongoose.model('Event');

exports.createEvent = (req, res) => {
    eventFunction(false, req, res);
}

exports.editEvent = (req, res) => {
    eventFunction(true, req, res);
}

exports.removeEvent = (req, res) => {
    let {eventName} = req.body;
    verifyJWT(req, res, (verifiedToken) => {
        const { _id: userID } = verifiedToken;
        Event.remove({ userID, eventName }, function (err) {
            if (err)
                return res.status(404).json({ error: "Event Not Found"});
            return res.json({ success: "Event Removed! "})
        });
    })
}


const verifyJWT = (req, res, success) => {
    let { authorization } = req.headers;
    const [, userToken] = authorization.split(' ');
    jwt.verify(userToken, secretKey, (err, verifiedToken) => {
        if (err)
            return res.status(401).json({ tokenError: "Invalid or expired JWT token" });
        success(verifiedToken);
    })
}

const eventFunction = function (edit, req, res) {
    // Parse data, TODO: do this on the client side in a controller because it's cluttered here
    let { eventName, eventDate, startTime, endTime } = req.body;

    if (edit)
        eventName = req.body.editing;

    verifyJWT(req, res, (verifiedToken) => {
        const { _id: userID } = verifiedToken;
        Event.findOne({
            userID, // Make sure no event exists already by this user with the same event name
            eventName,
        }, (err, event) => {
            if (err) // Error from MongoDB
                return res.status(500).json({ internalError: "Internal error querying MongoDB database", ...err })
            if (event && !edit) // Event with same user ID and same eventName found
                return res.status(409).json({ eventName: `You already have an event with this name` })
            if (!event && edit)
                return res.status(404).json({ internalError: "Could could not find this event" })
            // If we get here we are all good to save our event
            let creating = {
                userID,
                eventName,
                eventDate,
                startTime,
                endTime,
            }

            let newEvent = new Event({
                ...creating,
            });

            if (edit) {
                creating.eventName = req.body.eventName;
                for (let key in creating) {
                    event[key] = creating[key];
                }
            }

            const saveHandler = ((err, event) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        generalError: "Internal server error saving event to MongoDB database", ...err
                    });
                } else {
                    return res.json(event);
                }
            });

            edit ? event.save(saveHandler) : newEvent.save(saveHandler);
        })
    })
};

exports.getEvents = function (req, res) {
    verifyJWT(req, res, (verifiedToken) => {
        const { _id: userID } = verifiedToken;
        Event.find({
            userID,
        }, (err, eventsQuery) => {
            if (err) // Error from MongoDB
                return res.status(500).json({ internalError: "Internal error querying MongoDB database", ...err })
            let events = [];
            for (let event of eventsQuery) {
                event = event.toJSON();
                delete event.userID;
                events.push(event);
            }
            return res.json({ events })
        })
    });

}

