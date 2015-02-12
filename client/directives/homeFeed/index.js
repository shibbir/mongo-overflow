(function(app) {
    "use strict";

    app.directive("questions", ["httpService", function(httpService) {
        return {
            restrict: "E",
            replace: true,
            scope: {},
            templateUrl: "/directives/homeFeed/template.html",
            link: function($scope) {

                $scope.getQuestions = function(params) {
                    var config = {
                        params: {
                            sort: params.sort,
                            size: params.size
                        }
                    };
                    httpService.get("/api/questions", config).success(function(data) {
                        $scope.questions = data;
                    });
                };

                $scope.getQuestions({});
            }
        };
    }]);
})(angular.module("mongoOverflow"));