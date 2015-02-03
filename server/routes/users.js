module.exports = function(app) {
    "use strict";

    app.route("/users/login").get(function(req, res) {
        res.render("users/login");
    });
};