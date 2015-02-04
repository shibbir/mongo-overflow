(function(app) {
    "use strict";

    app.directive("homeFeed", ["$resource", function($resource) {
        return {
            restrict: "E",
            replace: true,
            scope: {},
            templateUrl: "/directives/homeFeed/template.html",
            link: function($scope) {
                $scope.questions = $resource("/api/questions").query();
            }
        };
    }]);
})(angular.module("mongoOverflow"));