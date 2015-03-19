(function(app) {
    "use strict";

    app.directive("navigation", [function() {
        return {
            restrict: "E",
            replace: true,
            scope: true,
            templateUrl: "/directives/navigation/template.html"
        };
    }]);
})(angular.module("mongoOverflow"));