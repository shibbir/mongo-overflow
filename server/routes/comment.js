var commentService = require("../services/commentService"),
    authentication = require("./middlewares/authentication");

module.exports = function(app) {
    "use strict";

    app.route("/api/parents/:parentId/comments")
        .get(commentService.getComments)
        .post(authentication.requiresLogin, commentService.addComment);
};