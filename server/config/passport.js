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

    /*
        =========================================================================
        ============================== LOCAL LOGIN ==============================
        =========================================================================
    */
    passport.use("local-login", new LocalStrategy({
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

                done(null, user);
            });
        });
    }));

    /*
        =========================================================================
        ============================= LOCAL SIGNUP ==============================
        =========================================================================
    */

    passport.use("local-signup", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function(req, email, password, done) {
        if(email) {
            email = email.toLowerCase();
        }

        process.nextTick(function() {
            User.findOne({ $or: [
                { "local.email": email },
                { "facebook.email": email },
                { "twitter.email": email },
                { "google.email": email }
            ]}, function(err, user) {
                if(err) {
                    return done(err);
                }

                if(user) {
                    return done(null, false, req.flash("error", "That email is already taken."));
                } else {
                    var newUser = new User();

                    newUser.displayName = req.body.name;
                    newUser.local.name = req.body.name;
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if(err) {
                            return done(err);
                        }
                        done(null, newUser);
                    });
                }
            });
        });
    }));

    /*
        =========================================================================
        =============================== FACEBOOK ================================
        =========================================================================
    */

    passport.use(new FacebookStrategy({
        clientID: authConfig.facebook.clientID,
        clientSecret: authConfig.facebook.clientSecret,
        callbackURL: authConfig.facebook.callbackURL
    }, function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ $or: [
                { "facebook.id" : profile.id },
                { "local.email": profile.emails[0].value },
                { "twitter.email": profile.emails[0].value },
                { "google.email": profile.emails[0].value }
            ]}, function(err, user) {
                if(err) {
                    return done(err);
                }

                if(user) {
                    if(!user.facebook.token) {
                        user.facebook.token = token;
                        user.facebook.name = profile.name.givenName + " " + profile.name.familyName;
                        user.facebook.email = profile.emails[0].value;

                        user.save(function(err) {
                            if(err) {
                                return done(err);
                            }
                            done(null, user);
                        });
                    } else {
                        done(null, user);
                    }
                } else {
                    var newUser = new User();

                    newUser.displayName = profile.name.givenName + " " + profile.name.familyName;
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.name.givenName + " " + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;

                    newUser.save(function(err) {
                        if(err) {
                            throw err;
                        }
                        done(null, newUser);
                    });
                }
            });
        });
    }));
};