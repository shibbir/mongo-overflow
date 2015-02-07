var Tag                = require("../models/tag"),
    _                  = require("lodash"),
    questionRepository = require("../repositories/questionRepository");

var formatQuestion = function(question) {
    "use strict";

    var description = question.description.substr(0, 200);

    if(question.description.length > description.length) {
        description += "...";
    }

    question.description = description;

    return question;
};

var getQuestions = function(req, res) {
    "use strict";

    var page = req.query.page ? parseInt(req.query.page) : 1,
        size = req.query.size ? parseInt(req.query.size) : 25,
        skip = page > 0 ? ((page - 1) * size) : 0;

        // votes
        // last activity

    var query = questionRepository.findAll(skip, size);

    query.sort({ "createdDate": -1 });
    query.select("creator title answers views tags description");
    query.populate("tags");
    query.populate("creator", "name reputations");
    query.lean();

    query.exec(function(err, docs) {
        if(err) {
            return res.sendStatus(500);
        }

        _.forEach(docs, function(doc) {
            doc = formatQuestion(doc);
        });
        res.status(200).json(docs);
    });
};

exports.getQuestions = getQuestions;