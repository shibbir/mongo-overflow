var authentication = require("./middlewares/authentication");

module.exports = function(app, passport) {
    "use strict";

    app.route("/users/login")
        .get(authentication.requireAnonymous, function(req, res) {
            res.render("users/login", { error: req.flash("error") });
        })
        .post(authentication.requireAnonymous, passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/users/login",
            failureFlash: "Invalid username or password."
        }));

    app.route("users/logout").get(authentication.requiresLogin, function(req, res) {
        req.logout();
        res.redirect("/");
    });
};