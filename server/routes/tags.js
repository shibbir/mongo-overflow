var tagService    = require("../services/tagService"),
    authentication = require("./middlewares/authentication");

module.exports = function(app) {
    "use strict";

    app.route("/api/tags")
        .get(authentication.requiresLogin, tagService.getTags);
};