(function(app) {
    "use strict";

    app.directive("comments", ["httpService", "configuration", "commentService", "identityService",
        function(httpService, configuration, commentService, identityService) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                id: "="
            },
            templateUrl: "/directives/comments/template.html",
            link: function($scope) {
                $scope.comments = [];

                $scope.getComments = function() {
                    httpService.get(configuration.getBaseApiUrl() + "questions/" + $scope.id + "/comments/").success(function(response) {
                        _.forEach(response.data, function(e) {
                            e = commentService.formatComment(e);
                        });
                        $scope.comments = response.data;
                    });
                }();

                $scope.isLoggedIn = identityService.isLoggedIn();

                if($scope.isLoggedIn) {
                    var config = {
                        params: {
                            access_token: identityService.getAccessToken()
                        }
                    };
                }

                $scope.addComment = function(comment) {
                    $scope.commentForm.submitted = true;
                    var data = {
                        text: comment,
                        question: $scope.id
                    };

                    if($scope.commentForm.$valid) {
                        httpService.post(configuration.getBaseApiUrl() + "questions/" + $scope.id + "/comments/", data, config).success(function (data) {
                            $scope.comments.push(commentService.formatComment(data));
                            comment = "";
                        });
                    }
                };
            }
        };
    }]);
})(angular.module("mongoOverflow"));