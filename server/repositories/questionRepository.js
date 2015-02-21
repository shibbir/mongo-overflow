var Question = require("../models/question");

var find = function(id) {
    "use strict";

    return Question.findOne({ _id: id });
};

var findAll = function(skip, size, callback) {
    "use strict";

    Question.where({}).count(function(err, count) {
        if(err) {
            return callback(err);
        }
        callback(null, Question.find({}).skip(skip).limit(size), count);
    });
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

var update = function(query, update, callback) {
    "use strict";

    Question.update(query, update, function(err) {
        if(err) {
            return callback(err);
        }
        callback(null);
    });
};

exports.find = find;
exports.findAll = findAll;
exports.insert = insert;
exports.update = update;