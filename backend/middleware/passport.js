var async = require('async'),
    helper = require('../services/helper'),
    LocalStrategy = require('passport-local').Strategy,
    Logger = require('../services/logger'),
    passport = require('passport'),
    userRepository = require('../repository/userRepository');

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, authenticateUser));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        userRepository.getById(id, function(err, data) {
            done(err, data);
        });
    });

    function authenticateUser(req, email, password, done) {
        async.waterfall([function(callback) {
            userRepository.findUserByEmail(email, callback);
        }, function(user, callback) {
            if (!helper.isEmpty(user)) {
                EncryptionService.checkPassword(password, user.password, function(err, data) {
                    callback(err, user, data);
                });
            } else {
                callback({
                    message: 'User with current email doesn\'t exist'
                });
            }
        }, function(user, isPasswordMatch, callback) {
            if (isPasswordMatch) {
                callback(null, user);
            } else {
                callback({
                    error: 'Incorrect Password'
                }, isPasswordMatch);
            }
        }], function(err, result) {
            done(err, result, null);
        });
    }
};
