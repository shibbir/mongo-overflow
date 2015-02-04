var User          = require("../models/user"),
    LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
    "use strict";

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({ email: email }, function(err, user) {
                if(err) {
                    return done(err);
                }

                if(!user) {
                    return done(null, false);
                }

                if(!user.validPassword(password)) {
                    return done(null, false);
                }

                return done(null, user);
            });
        });
    }));
};