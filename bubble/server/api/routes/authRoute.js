'use strict';
module.exports = function(app) {
    const userController = require('../controllers/authController.js');
    // todoList Routes
    app.route('/auth/register')
        .post(userController.register);
    app.route('/auth/login')
        .post(userController.sign_in);
};
