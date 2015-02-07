var path       = require("path"),
    flash      = require("connect-flash"),
    express    = require("express"),
    session    = require("express-session"),
    bodyParser = require("body-parser");

module.exports = function(passport) {
    "use strict";

    var app = express();

    app.use(express.static(__dirname + "../../../client"));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(session({ secret: "app-secret-key", resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    app.set("view engine", "jade");
    app.set("port", process.env.PORT || 7070);
    app.set("views", path.join(__dirname, "../views"));

    if(app.settings.env === "development") {
        app.set("json spaces", 2);
        app.locals.pretty = true;
    }

    return app;
};