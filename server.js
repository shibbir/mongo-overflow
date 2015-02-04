var mongoose = require("mongoose"),
    app      = require("./server/config/express")(),
    database = require("./server/config/database");

mongoose.connect(database.config.url);

require("./server/routes/pages")(app);
require("./server/routes/users")(app);
require("./server/routes/questions")(app);

require("./server/config/seeder").seed();

app.listen(app.get("port"), function() {
    "use strict";

    console.info("App running on port " + app.get("port"));
});