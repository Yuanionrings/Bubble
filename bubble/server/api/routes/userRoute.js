'use strict';
module.exports = function(app) {
    var userController = require('../controllers/userController.js');
    // todoList Routes
    app.route('/auth/register')
        .post(userController.register);
    app.route('/auth/login')
        .post(userController.sign_in);
};
