var authentication = require("./middlewares/authentication");

module.exports = function(app, passport) {
    "use strict";

    app.route("/users/register")
        .get(authentication.requireAnonymous, function(req, res) {
            res.render("users/register", { error: req.flash("error") });
        })
        .post(authentication.requireAnonymous, passport.authenticate("local-signup", {
            successRedirect: "/",
            failureRedirect: "/users/register",
            failureFlash: true
        }));

    app.route("/users/login")
        .get(authentication.requireAnonymous, function(req, res) {
            res.render("users/login", { error: req.flash("error") });
        })
        .post(authentication.requireAnonymous, passport.authenticate("local-login", {
            successRedirect: "/",
            failureRedirect: "/users/login",
            failureFlash: "Invalid username or password."
        }));

    app.route("/auth/facebook").get(authentication.requireAnonymous, passport.authenticate("facebook", { scope : "email" }));

    app.route("/auth/facebook/callback").get(authentication.requireAnonymous, passport.authenticate("facebook", {
        successRedirect : "/",
        failureRedirect : "/users/login"
    }));

    app.route("/users/logout").get(authentication.requiresLogin, function(req, res) {
        req.logout();
        res.redirect("/");
    });
};