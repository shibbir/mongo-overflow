(function(app) {
    "use strict";

    app.directive("errorMessage", [function() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                messages: "="
            },
            template: "<div class='ui negative message'>" +
                            "<header>Your request couldn't be submitted. Please see the errors below.</header>" +
                            "<p ng-repeat='message in messages' ng-bind='message'></p>" +
                       "</div>"
        };
    }]);
})(angular.module("mongoOverflow"));