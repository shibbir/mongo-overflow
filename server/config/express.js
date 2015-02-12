var path         = require("path"),
    flash        = require("connect-flash"),
    express      = require("express"),
    session      = require("express-session"),
    database     = require("./database"),
    bodyParser   = require("body-parser"),
    MongoStore   = require("connect-mongo")(session),
    cookieParser = require("cookie-parser");

module.exports = function(passport) {
    "use strict";

    var app = express();

    app.use(express.static(__dirname + "../../../client"));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({
        secret: "app-secret-key",
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            url: database.config.url,
            ttl: 7 * 24 * 60 * 60
        })
    }));
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