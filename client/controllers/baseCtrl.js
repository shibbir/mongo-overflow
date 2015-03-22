(function(app) {
    "use strict";

    app.controller("BaseCtrl", ["identityService", "$rootScope", function(identityService, $rootScope) {
        this.logout = function() {
            identityService.clearAccessToken();
            identityService.clearLoggedInUser();

            delete $rootScope.loggedInUser;
        };
    }]);
})(angular.module("mongoOverflow"));