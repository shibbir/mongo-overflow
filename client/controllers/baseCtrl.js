(function(app) {
    "use strict";

    app.controller("BaseCtrl", ["identity", "$rootScope", function(identity, $rootScope) {
        this.logout = function() {
            identity.clearAccessToken();
            identity.clearLoggedInUser();

            delete $rootScope.loggedInUser;
        };
    }]);
})(angular.module("mongoOverflow"));