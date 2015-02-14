var authentication = require("./middlewares/authentication");

module.exports = function(app, passport) {
    "use strict";

    app.route("/auth/register")
        .get(authentication.requireAnonymous, function(req, res) {
            res.render("auth/register", { error: req.flash("error") });
        })
        .post(authentication.requireAnonymous, passport.authenticate("local-signup", {
            successRedirect: "/",
            failureRedirect: "/auth/register",
            failureFlash: true
        }));

    app.route("/auth/login")
        .get(authentication.requireAnonymous, function(req, res) {
            res.render("auth/login", { error: req.flash("error") });
        })
        .post(authentication.requireAnonymous, passport.authenticate("local-login", {
            successRedirect: "/",
            failureRedirect: "/auth/login",
            failureFlash: "Invalid username or password."
        }));

    app.route("/auth/facebook").get(authentication.requireAnonymous, passport.authenticate("facebook", { scope : "email" }));

    app.route("/auth/facebook/callback").get(authentication.requireAnonymous, passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/auth/login"
    }));

    app.route("/auth/google").get(authentication.requireAnonymous, passport.authenticate("google", { scope : ["profile", "email"] }));

    app.route("/auth/google/callback").get(authentication.requireAnonymous, passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/auth/login"
    }));

    app.route("/auth/github").get(authentication.requireAnonymous, passport.authenticate("github"));

    app.route("/auth/github/callback").get(authentication.requireAnonymous, passport.authenticate("github", {
        successRedirect: "/",
        failureRedirect: "/auth/login"
    }));

    app.route("/auth/logout").get(authentication.requiresLogin, function(req, res) {
        req.logout();
        res.redirect("/");
    });
};