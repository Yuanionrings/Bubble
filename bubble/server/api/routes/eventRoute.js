'use strict';
module.exports = function(app) {
    const eventController = require('../controllers/eventController.js');
    // todoList Routes
    app.route('/events/createEvent')
        .post(eventController.createEvent);
};
