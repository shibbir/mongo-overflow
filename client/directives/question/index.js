(function(app) {
    "use strict";

    app.directive("question", ["httpService", function(httpService) {
        return {
            restrict: "E",
            replace: true,
            scope: {},
            templateUrl: "/directives/question/template.html",
            link: function($scope) {

                var questionId = window.location.pathname.replace(/\//g, "").replace("questions", "");

                $scope.getQuestion = function() {
                    httpService.get("/api/questions/" + questionId).success(function(data) {
                        $scope.question = data;
                    }).error(function() {
                        window.location = "/";
                    });
                }();

                $scope.voteUp = function(question) {
                    if(!question.upVoted) {
                        if(question.downVoted) {
                            httpService.remove("/api/questions/" + question._id + "/downVote").success(function () {
                                delete question.downVoted;
                                question.downVotes.length--;
                            });
                        } else {
                            httpService.patch("/api/questions/" + question._id + "/upVote").success(function () {
                                question.upVotes.length++;

                                if(question.downVoted) {
                                    delete question.downVoted;
                                } else {
                                    question.upVoted = true;
                                }
                            });
                        }
                    }
                };

                $scope.voteDown = function(question) {
                    if(!question.downVoted) {
                        if(question.upVoted) {
                            httpService.remove("/api/questions/" + question._id + "/upVote").success(function () {
                                delete question.upVoted;
                                question.upVotes.length--;
                            });
                        } else {
                            httpService.patch("/api/questions/" + question._id + "/downVote").success(function () {
                                question.downVotes.length++;

                                if(question.upVoted) {
                                    delete question.upVoted;
                                } else {
                                    question.downVoted = true;
                                }
                            });
                        }
                    }
                };

                $scope.toggleFavorite = function(question) {
                    if(question.favorite) {
                        httpService.remove("/api/questions/" + question._id + "/favorite").success(function() {
                            delete question.favorite;
                        });
                    } else {
                        httpService.patch("/api/questions/" + question._id + "/favorite").success(function() {
                            question.favorite = true;
                        });
                    }
                };
            }
        };
    }]);
})(angular.module("mongoOverflow"));