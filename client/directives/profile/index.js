(function(app) {
    "use strict";

    app.directive("profile", ["httpService", "configService", function(httpService, configService) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                userId: "="
            },
            templateUrl: "/directives/profile/template.html",
            link: function($scope) {
                $scope.getProfile = function() {
                    httpService.get(configService.baseApiUrl + "users/" + $scope.userId).success(function(data) {
                        $scope.profile = data;
                        $scope.$emit("client::onProfileFetched");
                    });
                }();

                $scope.$on("client::onProfileFetched", function() {
                    httpService.patch(configService.baseApiUrl + "users/" + $scope.userId + "/views").success(function(data) {
                        if(_.isArray(data)) {
                            $scope.profile.views = data;
                        }
                    });
                });
            }
        };
    }]);
})(angular.module("mongoOverflow"));