var authentication = require("./middlewares/authentication");

module.exports = function(app, passport) {
    "use strict";

    app.route("/auth/github").get(authentication.requireAnonymous, passport.authenticate("github"));

    app.route("/auth/github/callback").get(authentication.requireAnonymous, passport.authenticate("github", {
        successRedirect: "/",
        failureRedirect: "/auth/login"
    }));
};