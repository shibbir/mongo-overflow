var mongoose = require("mongoose"),
    passport = require("passport"),
    _        = require("lodash"),
    database = require("./server/config/database");

mongoose.connect(database.config.url);

var app = require("./server/config/express")(passport);

require("./server/config/passport")(passport);

app.use(function(req, res, next) {
    "use strict";

    res.locals.user = _.pick(req.user, ["name"]);
    next();
});

require("./server/routes/pages")(app);
require("./server/routes/users")(app, passport);
require("./server/routes/questions")(app);

//require("./server/config/seeder").seed();

app.listen(app.get("port"), function() {
    "use strict";
    console.info("App running on port " + app.get("port"));
});