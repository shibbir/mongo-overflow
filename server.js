var _        = require("lodash"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    database = require("./server/config/database");

mongoose.connect(database.config.url);

var app = require("./server/config/express")(passport);

require("./server/config/passport")(passport);

app.use(function(req, res, next) {
    "use strict";

    var user = {};

    if(req.user) {
        user._id = req.user._id;
        user.displayName = req.user.displayName;
        user.seoName = _.kebabCase(req.user.displayName);
        user.isAuthenticated = true;
    }
    res.locals.user = user;
    next();
});

require("./server/routes/pages")(app);
require("./server/routes/auth")(app, passport);
require("./server/routes/question")(app);
require("./server/routes/comment")(app);
require("./server/routes/user")(app);
require("./server/routes/tag")(app);

//require("./server/config/seeder").seed();

app.listen(app.get("port"), function() {
    "use strict";
    console.info("App running on port " + app.get("port"));
});