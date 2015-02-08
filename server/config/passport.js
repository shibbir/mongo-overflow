var User             = require("../models/user"),
    authConfig       = require("../config/auth"),
    LocalStrategy    = require("passport-local").Strategy,
    FacebookStrategy = require("passport-facebook").Strategy;

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
            User.findOne({ "local.email": email }, function(err, user) {
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

    passport.use(new FacebookStrategy({
        clientID: authConfig.facebook.clientID,
        clientSecret: authConfig.facebook.clientSecret,
        callbackURL: authConfig.facebook.callbackURL
    }, function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ "facebook.id" : profile.id }, function(err, user) {

                if(err) {
                    return done(err);
                }

                if(user) {
                    return done(null, user);
                } else {
                    var newUser = new User();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.name.givenName + " " + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;

                    newUser.save(function(err) {
                        if(err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};