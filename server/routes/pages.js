module.exports = function(app) {

    "use strict";

    app.route("/tags").get(function(req, res) {
        res.render("tags/index");
    });
};