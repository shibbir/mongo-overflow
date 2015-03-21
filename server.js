var _        = require("lodash"),
    passport = require("passport");

var app = require("./server/config/express")(passport);

require("./server/routes/pages")(app);
require("./server/routes/question")(app);
require("./server/routes/comment")(app);
require("./server/routes/user")(app);
require("./server/routes/tag")(app);

app.route("/").get(function(req, res) {
    "use strict";
    res.render("index");
});

app.listen(app.get("port"), function() {
    "use strict";
    console.info("App running on port " + app.get("port"));
});