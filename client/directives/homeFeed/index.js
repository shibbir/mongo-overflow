(function(app) {
    "use strict";

    app.directive("questions", ["httpService", "configService", function(httpService, configService) {
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
                    httpService.get(configService.baseApiUrl + "/questions", config).success(function(data) {
                        $scope.questions = data;
                    });
                };

                $scope.getQuestions({});
            }
        };
    }]);
})(angular.module("mongoOverflow"));