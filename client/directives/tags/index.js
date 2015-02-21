(function(app) {
    "use strict";

    app.directive("tags", ["baseService", "httpService", "configService", function(baseService, httpService, configService) {
        return {
            restrict: "E",
            replace: true,
            scope: {},
            templateUrl: "/directives/tags/template.html",
            link: function($scope) {
                var queryStrings = baseService.getQueryStrings();

                $scope.initPagination = function(pagination) {
                    $scope.pages = [];
                    for(var idx = 1; idx <= pagination.pages; idx++) {
                        $scope.pages.push({
                            href: "/tags?page=" + idx,
                            active: !queryStrings.page && idx === 1 || parseInt(queryStrings.page) === idx
                        });
                    }
                    delete _.findWhere($scope.pages, { active: true }).href;
                };

                $scope.getTags = function() {
                    var config = {
                        params: {
                            page: queryStrings.page,
                            sort: queryStrings.sort
                        }
                    };
                    httpService.get(configService.baseApiUrl + "/tags", config).success(function(response) {
                        $scope.tags = response.data;
                        $scope.initPagination(response.pagination);
                    });
                }();
            }
        };
    }]);
})(angular.module("mongoOverflow"));