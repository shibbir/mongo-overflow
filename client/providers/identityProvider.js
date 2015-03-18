(function(app) {
    "use strict";

    app.provider("identity", ["configurationProvider", function(configuration) {
        var browserStoragePrefix = configuration.$get().getBrowserStoragePrefix();

        var saveLoggedInUser = function(user, persistent) {
            if(persistent) {
                localStorage[browserStoragePrefix + "-user"] = JSON.stringify(user);
            } else {
                sessionStorage[browserStoragePrefix + "-user"] = JSON.stringify(user);
            }
        };

        var getLoggedInUser = function() {
            return JSON.parse(sessionStorage[browserStoragePrefix + "-user"] ||
                localStorage[browserStoragePrefix + "-user"]);
        };

        var clearLoggedInUser = function() {
            localStorage.removeItem(browserStoragePrefix + "-user");
            sessionStorage.removeItem(browserStoragePrefix + "-user");
        };

        var saveAccessToken = function(accessToken, persistent) {
            if(persistent) {
                localStorage[browserStoragePrefix + "-accessToken"] = accessToken;
            } else {
                sessionStorage[browserStoragePrefix + "-accessToken"] = accessToken;
            }
        };

        var getAccessToken = function() {
            return sessionStorage.getItem(browserStoragePrefix + "-accessToken") ||
                localStorage.getItem(browserStoragePrefix + "-accessToken");
        };

        var clearAccessToken = function() {
            localStorage.removeItem(browserStoragePrefix + "-accessToken");
            sessionStorage.removeItem(browserStoragePrefix + "-accessToken");
        };

        this.$get = function() {
            return {
                getLoggedInUser: getLoggedInUser,
                saveLoggedInUser: saveLoggedInUser,
                clearLoggedInUser: clearLoggedInUser,
                getAccessToken: getAccessToken,
                saveAccessToken: saveAccessToken,
                clearAccessToken: clearAccessToken
            };
        };
    }]);
})(angular.module("mongoOverflow"));