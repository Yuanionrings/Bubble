'use strict';
module.exports = function (app) {
    const eventController = require('../controllers/eventController.js');
    // todoList Routes
    app.route('/events/createEvent')
        .post(eventController.createEvent);
    app.route('/events/editEvent')
        .post(eventController.editEvent);
    app.route('/events/removeEvent')
        .post(eventController.removeEvent);
    app.route('/events')
        .get(eventController.getEvents)
};
