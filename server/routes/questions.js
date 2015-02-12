var authentication  = require("./middlewares/authentication"),
    questionService = require("../services/questionService");

module.exports = function(app) {
    "use strict";

    app.route("/api/questions")
        .get(questionService.getQuestions)
        .post(authentication.requiresLogin, questionService.postQuestion);

    app.route("/api/questions/:id")
        .get(questionService.getQuestion);

    app.route("/api/questions/:id/upVote")
        .patch(authentication.requiresLogin, questionService.pushUpVote)
        .delete(authentication.requiresLogin, questionService.pullUpVote);

    app.route("/api/questions/:id/downVote")
        .patch(authentication.requiresLogin, questionService.pushDownVote)
        .delete(authentication.requiresLogin, questionService.pullDownVote);

    app.route("/api/questions/:id/favorite")
        .patch(authentication.requiresLogin, questionService.pushFavorite)
        .delete(authentication.requiresLogin, questionService.pullFavorite);
};