(function(app) {
    "use strict";

    app.controller("QuestionDetailsCtrl", ["httpService", "configuration", "$timeout", "$routeParams", "$location", "identityService",
        function(httpService, configuration, $timeout, $routeParams, $location, identityService) {
            var ctrl = this;

            httpService.get(configuration.getBaseApiUrl() + "questions/" + $routeParams.id).success(function(data) {
                ctrl.question = data;
            }).error(function() {
                $location.path("/");
            });

            this.isLoggedIn = identityService.isLoggedIn();

            if(this.isLoggedIn) {
                var config = {
                    params: {
                        access_token: identityService.getAccessToken()
                    }
                };
            }

            this.voteUp = function(question) {
                if(!question.upVoted) {
                    httpService.patch(configuration.getBaseApiUrl() + "questions/" + question._id + "/upVote", null, config).success(function(response) {
                        $timeout(function() {
                            _.assign(question, _.pick(response, "upVotes", "downVotes", "upVoted", "downVoted"));
                        });
                    });
                }
            };

            this.voteDown = function(question) {
                if(!question.downVoted) {
                    httpService.patch(configuration.getBaseApiUrl() + "questions/" + question._id + "/downVote", null, config).success(function(response) {
                        $timeout(function() {
                            _.assign(question, _.pick(response, "upVotes", "downVotes", "upVoted", "downVoted"));
                        });
                    });
                }
            };

            this.toggleFavorite = function(question) {
                if(question.favorite) {
                    httpService.remove(configuration.getBaseApiUrl() + "questions/" + question._id + "/favorite", null, config).success(function() {
                        delete ctrl.question.favorite;
                    });
                } else {
                    httpService.patch(configuration.getBaseApiUrl() + "questions/" + question._id + "/favorite", null, config).success(function() {
                        ctrl.question.favorite = true;
                    });
                }
            };
        }
    ]);
})(angular.module("mongoOverflow"));