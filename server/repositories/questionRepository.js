var Question = require("../models/question");

var findAll = function(skip, size, fields, callback) {
    "use strict";

    var query = Question.find({}).skip(skip).limit(size).sort({ "createdDate": -1 });

    if(fields) {
        query.select(fields);
    }

    query.exec(function(err, docs) {
        if(err) {
            return callback(err);
        }
        callback(null, docs);
    });
};

exports.findAll = findAll;