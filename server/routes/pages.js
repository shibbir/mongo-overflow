var authentication = require("./middlewares/authentication");

module.exports = function(app) {

    "use strict";

    app.route("/").get(function(req, res) {
        res.render("pages/home");
    });

    app.route("/questions").get(function(req, res) {
        res.render("questions/index");
    });

    app.route("/questions/ask").get(authentication.requiresLogin, function(req, res) {
        res.render("questions/ask", { error: req.flash("error") });
    });
};