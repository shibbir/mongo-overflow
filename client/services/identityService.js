(function(app) {
    "use strict";

    app.factory("identityService", ["httpService", "configuration", function(httpService, configuration) {
        var browserStoragePrefix = configuration.getBrowserStoragePrefix();

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

        var getUserByToken = function(token, provider) {
            var config = {
                params: {
                    token: token,
                    provider: provider
                }
            };
            return httpService.get(configuration.getBaseApiUrl() + "oauth/user", config);
        };

        var isLoggedIn = function() {
            return getAccessToken() && getAccessToken();
        };

        return {
            getLoggedInUser: getLoggedInUser,
            saveLoggedInUser: saveLoggedInUser,
            clearLoggedInUser: clearLoggedInUser,
            getAccessToken: getAccessToken,
            saveAccessToken: saveAccessToken,
            clearAccessToken: clearAccessToken,
            getUserByToken: getUserByToken,
            isLoggedIn: isLoggedIn
        };
    }]);
})(angular.module("mongoOverflow"));