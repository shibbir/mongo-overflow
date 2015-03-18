(function(app) {
    "use strict";

    app.directive("profile", ["httpService", "configuration", function(httpService, configuration) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                userId: "="
            },
            templateUrl: "/directives/profile/template.html",
            link: function($scope) {
                $scope.getProfile = function() {
                    httpService.get(configuration.getBaseApiUrl() + "users/" + $scope.userId).success(function(data) {
                        $scope.profile = data;
                        $scope.$emit("client::onProfileFetched");
                    });
                }();

                $scope.$on("client::onProfileFetched", function() {
                    httpService.patch(configuration.getBaseApiUrl() + "users/" + $scope.userId + "/views").success(function(data) {
                        if(_.isArray(data)) {
                            $scope.profile.views = data;
                        }
                    });
                });
            }
        };
    }]);
})(angular.module("mongoOverflow"));