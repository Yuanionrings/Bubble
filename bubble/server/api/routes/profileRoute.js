'use strict';
module.exports = function (app) {
    const profileController = require('../controllers/profileController.js');
    app.route('/profile')
        .get(profileController.getProfileData);
    app.route('/profile/setUsername')
        .post(profileController.setUsername);
    app.route('/profile/setFullName')
        .post(profileController.setFullName);
    app.route('/profile/setEmail')
        .post(profileController.setEmail);
};