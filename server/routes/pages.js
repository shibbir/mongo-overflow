var authentication = require("./middlewares/authentication");

module.exports = function(app) {

    "use strict";

    app.route("/").get(function(req, res) {
        res.render("layouts/master");
    });

    app.route("/tags").get(function(req, res) {
        res.render("tags/index");
    });

    app.route("/questions").get(function(req, res) {
        res.render("questions/index");
    });

    app.route("/questions/ask").get(authentication.requiresLogin, function(req, res) {
        res.render("questions/ask", { error: req.flash("error") });
    });

    app.route("/questions/:id").get(function(req, res) {
        res.render("questions/view");
    });

    app.route("/users/:id/edit").get(authentication.requiresLogin, function(req, res) {
        res.render("users/edit");
    });

    app.route("/users/:id/:name").get(function(req, res) {
        res.render("users/profile", { userId: req.params.id });
    });
};