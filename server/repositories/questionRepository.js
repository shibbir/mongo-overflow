var Tag      = require("../models/tag"),
    Question = require("../models/question");

var findAll = function(skip, size, fields, populate, callback) {
    "use strict";

    var query = Question.find({}).skip(skip).limit(size).sort({ "createdDate": -1 });

    if(fields) {
        query.select(fields);
    }

    if(populate) {
        query.populate(populate);
    }

    query.exec(function(err, docs) {
        if(err) {
            return callback(err);
        }
        callback(null, docs);
    });
};

exports.findAll = findAll;