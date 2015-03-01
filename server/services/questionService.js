var Tag                = require("../models/tag"),
    _                  = require("lodash"),
    Question           = require("../models/question"),
    validator          = require("validator"),
    reputationService  = require("./reputationService"),
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

    questionRepository.findAll(skip, size, function(err, query, count) {
        if(err) {
            return res.sendStatus(500);
        }

        if(sort === "new") {
            query.sort({ "date": -1 });
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
            res.status(200).json({
                data: docs,
                pagination: {
                    page: page,
                    pages: count / size
                }
            });
        });
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
        .select("creator title answers views tags description upVotes downVotes favorites date")
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

var upVote = function(req, res) {
    "use strict";

    var query = {
        $addToSet: { upVotes: req.user.id },
        $pull: { downVotes: req.user.id }
    };

    questionRepository.findByQuery({ _id: req.params.id, downVotes: req.user.id }, function(err, downVoted) {
        if(downVoted) {
            delete query.$addToSet;
        }

        questionRepository.findByIdAndUpdate(req.params.id, query, function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            var data = {
                upVotes: doc.upVotes,
                downVotes: doc.downVotes,
                upVoted: doc.isUpVoted(req.user.id),
                downVoted: doc.isDownVoted(req.user.id)
            };

            if(downVoted) {
                reputationService.pull({
                    appreciator: req.user.id,
                    question: req.params.id,
                    reputationType: "downVote"
                }, function(err) {
                    if(err) {
                        return res.sendStatus(500);
                    }
                    res.status(200).json(data);
                });
            } else {
                reputationService.push({
                    contributor: doc.creator,
                    appreciator: req.user.id,
                    question: req.params.id,
                    reputationType: "upVote",
                    area: { id: req.params.id, type: "question" },
                    contribution: { asked: true }
                }, function(err) {
                    if(err) {
                        return res.sendStatus(500);
                    }
                    res.status(200).json(data);
                });
            }
        });
    });
};

var downVote = function(req, res) {
    "use strict";

    var query = {
        $addToSet: { downVotes: req.user.id },
        $pull: { upVotes: req.user.id }
    };

    questionRepository.findByQuery({ _id: req.params.id, upVotes: req.user.id }, function(err, upVoted) {
        if(upVoted) {
            delete query.$addToSet;
        }

        questionRepository.findByIdAndUpdate(req.params.id, query, function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            var data = {
                upVotes: doc.upVotes,
                downVotes: doc.downVotes,
                upVoted: doc.isUpVoted(req.user.id),
                downVoted: doc.isDownVoted(req.user.id)
            };

            if(upVoted) {
                reputationService.pull({
                    appreciator: req.user.id,
                    question: req.params.id,
                    reputationType: "upVote"
                }, function(err) {
                    if(err) {
                        return res.sendStatus(500);
                    }
                    res.status(200).json(data);
                });
            } else {
                reputationService.push({
                    contributor: doc.creator,
                    appreciator: req.user.id,
                    question: req.params.id,
                    reputationType: "downVote",
                    area: { id: req.params.id, type: "question" },
                    contribution: { asked: true }
                }, function(err) {
                    if(err) {
                        return res.sendStatus(500);
                    }
                    res.status(200).json(data);
                });
            }
        });
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

var getCountByQuery = function(query, callback) {
    "use strict";

    Question.where(query).count(function(err, count) {
        if(err) {
            return callback(err);
        }
        callback(null, count);
    });
};

exports.getQuestion = getQuestion;
exports.getQuestions = getQuestions;
exports.postQuestion = postQuestion;
exports.upVote = upVote;
exports.downVote = downVote;
exports.pushFavorite = pushFavorite;
exports.pullFavorite = pullFavorite;
exports.getCountByQuery = getCountByQuery;