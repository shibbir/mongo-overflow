var User             = require("../models/user"),
    authConfig       = require("../config/auth"),
    GitHubStrategy   = require("passport-github").Strategy;

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
        ================================ GITHUB =================================
        =========================================================================
    */

    passport.use(new GitHubStrategy({
        clientID: authConfig.github.clientID,
        clientSecret: authConfig.github.clientSecret,
        callbackURL: authConfig.github.callbackURL
    }, function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ $or: [
                { "github.id": profile.id },
                { "facebook.email": profile.emails[0].value },
                { "google.email": profile.emails[0].value },
                { "local.email": profile.emails[0].value },
                { "twitter.email": profile.emails[0].value }
            ]}, function(err, user) {
                if(err) {
                    return done(err);
                }

                if(user) {
                    if(!user.github.id) {
                        user.github.id = profile.id;
                        user.github.name = profile.displayName;
                        user.github.email = profile.emails[0].value;
                        user.github.username = profile.username;

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
                    newUser.github.id = profile.id;
                    newUser.github.name = profile.displayName;
                    newUser.github.email = profile.emails[0].value;
                    newUser.github.username = profile.username;
                    newUser.displayName = profile.displayName;

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
};