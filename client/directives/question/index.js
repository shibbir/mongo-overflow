(function(app) {
    "use strict";

    app.directive("question", ["httpService", "configService", "$timeout", function(httpService, configService, $timeout) {
        return {
            restrict: "E",
            replace: true,
            scope: {},
            templateUrl: "/directives/question/template.html",
            link: function($scope) {

                var questionId = window.location.pathname.replace(/\//g, "").replace("questions", "");

                $scope.getQuestion = function() {
                    httpService.get(configService.baseApiUrl + "/questions/" + questionId).success(function(data) {
                        $scope.question = data;
                    }).error(function() {
                        window.location = "/";
                    });
                }();

                $scope.voteUp = function(question) {
                    if(!question.upVoted) {
                        httpService.patch("/api/questions/" + question._id + "/upVote").success(function(response) {
                            $timeout(function() {
                                _.assign(question, _.pick(response, "upVotes", "downVotes", "upVoted", "downVoted"));
                            });
                        });
                    }
                };

                $scope.voteDown = function(question) {
                    if(!question.downVoted) {
                        httpService.patch(configService.baseApiUrl + "/questions/" + question._id + "/downVote").success(function(response) {
                            $timeout(function() {
                                _.assign(question, _.pick(response, "upVotes", "downVotes", "upVoted", "downVoted"));
                            });
                        });
                    }
                };

                $scope.toggleFavorite = function(question) {
                    if(question.favorite) {
                        httpService.remove(configService.baseApiUrl + "/questions/" + question._id + "/favorite").success(function() {
                            delete question.favorite;
                        });
                    } else {
                        httpService.patch(configService.baseApiUrl + "/questions/" + question._id + "/favorite").success(function() {
                            question.favorite = true;
                        });
                    }
                };
            }
        };
    }]);
})(angular.module("mongoOverflow"));