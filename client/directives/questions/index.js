(function(app) {
    "use strict";

    app.directive("questions", ["baseService", "httpService", "configuration", function(baseService, httpService, configuration) {
        return {
            restrict: "E",
            replace: true,
            scope: {},
            templateUrl: "/directives/questions/template.html",
            link: function($scope) {
                var queryStrings = baseService.getQueryStrings();

                $scope.initPagination = function(pagination) {
                    $scope.pages = [];
                    for(var idx = 1; idx <= pagination.pages; idx++) {
                        $scope.pages.push({
                            href: "/questions?page=" + idx,
                            active: !queryStrings.page && idx === 1 || parseInt(queryStrings.page) === idx
                        });
                    }
                    delete _.findWhere($scope.pages, { active: true}).href;
                };

                $scope.getQuestions = function() {
                    var config = {
                        params: {
                            page: queryStrings.page,
                            sort: queryStrings.sort
                        }
                    };
                    httpService.get(configuration.getBaseApiUrl() + "questions", config).success(function(response) {
                        $scope.questions = response.data;
                        $scope.initPagination(response.pagination);
                    });
                }();
            }
        };
    }]);
})(angular.module("mongoOverflow"));