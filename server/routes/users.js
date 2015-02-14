var userService    = require("../services/userService"),
    authentication = require("./middlewares/authentication");

module.exports = function(app) {
    "use strict";

    app.route("/api/users/:id")
        .get(userService.getUser)
        .patch(authentication.requiresLogin, userService.updateInfo);
};