var Tag                = require("../models/tag"),
    _                  = require("lodash"),
    validator          = require("validator"),
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
        size = req.query.size ? parseInt(req.query.size) : 20,
        skip = page > 0 ? ((page - 1) * size) : 0,
        sort = req.query.sort || "new";

        // votes
        // last activity

    var query = questionRepository.findAll(skip, size);

    if(sort === "new") {
        query.sort({ "createdDate": -1 });
    }

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

var postQuestion = function(req, res) {
    "use strict";

    var model = {
        title: validator.escape(req.body.title),
        description: validator.escape(req.body.description),
        creator: req.user.id
    };

    questionRepository.insert(model, function(err, doc) {
        if(err) {
            return res.sendStatus(500);
        }
        res.status(200).json(doc);
    });
};

var getQuestion = function(req, res) {
    "use strict";

    questionRepository
        .find(req.params.id)
        .select("creator title answers views tags description upVotes downVotes favorites createdDate")
        .populate("tags")
        .populate("creator", "name reputations")
        .exec(function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            doc = doc.toObject();
            doc.upVoted = _.findWhere(doc.upVotes, function(chr) { return chr.toString() === req.user.id.toString; });
            doc.downVoted = _.findWhere(doc.downVotes, function(chr) { return chr.toString() === req.user.id.toString; });
            doc.favorite = _.findWhere(doc.favorites, function(chr) { return chr.toString() === req.user.id.toString; });

            res.status(200).json(doc);
        });
};

var pushUpVote = function(req, res) {
    "use strict";

    questionRepository.update({ _id: req.params.id }, { $addToSet: { upVotes: req.user.id }, $pull: { downVotes: req.user.id }}, function(err) {
        if(err) {
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

var pullUpVote = function(req, res) {
    "use strict";

    questionRepository.update({ _id: req.params.id }, { $pull: { upVotes: req.user.id }}, function(err) {
        if(err) {
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

var pushDownVote = function(req, res) {
    "use strict";

    questionRepository.update({ _id: req.params.id }, { $addToSet: { downVotes: req.user.id }, $pull: { upVotes: req.user.id }}, function(err) {
        if(err) {
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

var pullDownVote = function(req, res) {
    "use strict";

    questionRepository.update({ _id: req.params.id }, { $pull: { downVotes: req.user.id }}, function(err) {
        if(err) {
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

var pushFavorite = function(req, res) {
    "use strict";

    questionRepository.update({ _id: req.params.id }, { $addToSet: { favorites: req.user.id }}, function(err) {
        if(err) {
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

var pullFavorite = function(req, res) {
    "use strict";

    questionRepository.update({ _id: req.params.id }, { $pull: { favorites: req.user.id }}, function(err) {
        if(err) {
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

exports.getQuestion = getQuestion;
exports.getQuestions = getQuestions;
exports.postQuestion = postQuestion;
exports.pushUpVote = pushUpVote;
exports.pullUpVote = pullUpVote;
exports.pushDownVote = pushDownVote;
exports.pullDownVote = pullDownVote;
exports.pushFavorite = pushFavorite;
exports.pullFavorite = pullFavorite;