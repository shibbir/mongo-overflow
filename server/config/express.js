var express    = require("express"),
    path       = require("path"),
    bodyParser = require("body-parser");

module.exports = function() {
    "use strict";

    var app = express();

    app.use(express.static(__dirname + "../../../client"));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.set("view engine", "jade");
    app.set("port", process.env.PORT || 7070);
    app.set("views", path.join(__dirname, "../views"));

    if(app.settings.env === "development") {
        app.set("json spaces", 2);
        app.locals.pretty = true;
    }

    return app;
};