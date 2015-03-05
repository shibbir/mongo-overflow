(function(app) {
    "use strict";

    app.directive("profile", ["baseService", "httpService", "configService", function(baseService, httpService, configService) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                userId: "="
            },
            templateUrl: "/directives/profile/template.html",
            link: function($scope) {
                $scope.getProfile = function() {
                    httpService.get(configService.baseApiUrl + "/users/" + $scope.userId).success(function(data) {
                        $scope.profile = data;
                    });
                }();
            }
        };
    }]);
})(angular.module("mongoOverflow"));