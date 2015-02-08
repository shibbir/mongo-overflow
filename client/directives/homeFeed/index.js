(function(app) {
    "use strict";

    app.directive("questions", ["$resource", function($resource) {
        return {
            restrict: "E",
            replace: true,
            scope: {},
            templateUrl: "/directives/homeFeed/template.html",
            link: function($scope) {

                $scope.getQuestions = function(config) {
                    $scope.questions = $resource("/api/questions").query({
                        sort: config.sort,
                        size: config.size
                    });
                };

                $scope.getQuestions({});
            }
        };
    }]);
})(angular.module("mongoOverflow"));