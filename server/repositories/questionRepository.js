var Question = require("../models/question");

var findAll = function(skip, size) {
    "use strict";

    return Question.find({}).skip(skip).limit(size);
};

var insert = function(model, callback) {
    "use strict";

    var question = new Question(model);

    question.save(function(err, doc) {
        if(err) {
            return callback(err);
        }
        callback(null, doc);
    });
};

exports.findAll = findAll;
exports.insert = insert;