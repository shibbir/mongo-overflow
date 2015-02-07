var Question = require("../models/question");

var findAll = function(skip, size) {
    "use strict";

    return Question.find({}).skip(skip).limit(size);
};

exports.findAll = findAll;