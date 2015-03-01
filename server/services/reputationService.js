var _                    = require("lodash"),
    reputationRepository = require("../repositories/reputationRepository");

var push = function(model, callback) {
    "use strict";

    reputationRepository.insert(model, function(err, doc) {
        if(err) {
            return callback(err);
        }
        callback(null, doc);
    });
};

var pull = function(query, callback) {
    "use strict";

    reputationRepository.deleteByQuery(query, function(err) {
        if(err) {
            return callback(err);
        }
        callback(null);
    });
};

exports.push = push;
exports.pull = pull;