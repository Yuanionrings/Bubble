'use strict';
module.exports = function (app) {
    const profileController = require('../controllers/profileController.js');
    app.route('/profile')
        .get(profileController.getProfileData);
    app.route('/profile/changeProfileData')
        .post(profileController.changeProfileData)
};