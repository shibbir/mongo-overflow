var express = require("express");

var app = express();

app.use(express.static(__dirname + "/client"));

app.set("view engine", "jade");
app.set("port", process.env.PORT || 7070);
app.set("views", require("path").join(__dirname, "/server/views"));

if(app.settings.env === "development") {
    app.locals.pretty = true;
}

require("./server/routes/pages")(app);

app.route("/").get(function(req, res) {
    "use strict";
    res.render("index");
});

app.listen(app.get("port"), function() {
    "use strict";
    console.info("App running on port " + app.get("port"));
});