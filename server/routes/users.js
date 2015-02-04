var authentication = require("./middlewares/authentication");

module.exports = function(app, passport) {
    "use strict";

    app.route("/users/login")
        .get(authentication.requireAnonymous, function(req, res) {
            res.render("users/login");
        })
        .post(authentication.requireAnonymous, passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: "Invalid username or password."
        }));
};