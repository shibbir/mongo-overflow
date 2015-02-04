var questionRepository = require("../repositories/questionRepository");

var getQuestions = function(req, res) {
    "use strict";

    var page = req.query.page ? parseInt(req.query.page) : 1,
        size = req.query.size ? parseInt(req.query.size) : 30,
        skip = page > 0 ? ((page - 1) * size) : 0;

    var fields = "title answers views tags";
    questionRepository.findAll(skip, size, fields, function(err, docs) {

        // votes
        // last activity

        if(err) {
            return res.sendStatus(500);
        }

        res.status(200).json(docs);
    });
};

exports.getQuestions = getQuestions;