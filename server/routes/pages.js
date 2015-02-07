module.exports = function(app) {

    "use strict";

    app.route("/").get(function(req, res) {
        res.render("pages/home");
    });

    app.route("/questions").get(function(req, res) {
        res.render("pages/questions");
    });
};