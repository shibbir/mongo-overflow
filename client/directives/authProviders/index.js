(function(app) {
    "use strict";

    app.directive("authProviders", ["$location", function($location) {
        return {
            restrict: "E",
            replace: true,
            scope: true,
            templateUrl: "/directives/authProviders/template.html",
            link: function(scope) {
                scope.action = "Sign up";

                if($location.path() === "/login") {
                    scope.action = "Log in";
                }
            }
        };
    }]);
})(angular.module("mongoOverflow"));