var Reputation = require("../models/reputation");

var insert = function(model, callback) {
    "use strict";

    var doc = new Reputation(model);

    doc.save(function(err, doc) {
        if(err) {
            return callback(err);
        }
        callback(null, doc);
    });
};

var deleteByQuery = function(condition, callback) {
    "use strict";

    Reputation.remove(condition, function(err) {
        if(err) {
            return callback(err);
        }
        callback(null);
    });
};

exports.insert = insert;
exports.deleteByQuery = deleteByQuery;