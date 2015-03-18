(function(app) {
    "use strict";

    app.directive("comments", ["httpService", "configuration", "commentService", function(httpService, configuration, commentService) {
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
                    httpService.get(configuration.getBaseApiUrl() + "parents/" + $scope.id + "/comments/").success(function(data) {
                        _.forEach(data, function(e) {
                            e = commentService.formatComment(e);
                        });
                        $scope.comments = data;
                    });
                }();

                $scope.addComment = function(comment) {
                    $scope.commentForm.submitted = true;
                    var data = {
                        text: comment,
                        question: $scope.id
                    };

                    if($scope.commentForm.$valid) {
                        httpService.post(configuration.getBaseApiUrl() + "parents/" + $scope.id + "/comments/", data).success(function (data) {
                            $scope.comments.push(commentService.formatComment(data));
                            comment = "";
                        });
                    }
                };
            }
        };
    }]);
})(angular.module("mongoOverflow"));