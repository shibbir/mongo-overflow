(function(app) {
    "use strict";

    app.directive("topBar", [function() {
        return {
            restrict: "E",
            replace: true,
            scope: true,
            templateUrl: "/directives/topBar/template.html"
        };
    }]);
})(angular.module("mongoOverflow"));