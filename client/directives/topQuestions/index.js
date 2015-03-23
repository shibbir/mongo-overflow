(function(app) {
    "use strict";

    app.directive("topQuestions", ["httpService", "configuration", function(httpService, configuration) {
        return {
            restrict: "E",
            replace: true,
            scope: {},
            templateUrl: "/directives/topQuestions/template.html",
            link: function($scope) {

                $scope.getQuestions = function() {
                    httpService.get(configuration.getBaseApiUrl() + "questions").success(function(response) {
                        $scope.questions = response.data;
                    });
                }();
            }
        };
    }]);
})(angular.module("mongoOverflow"));