(function(app) {
    "use strict";

    app.factory("urlService", [function() {
        var getQueryStrings = function () {
            var assoc = {};
            var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
            var queryString = location.search.substring(1);
            var keyValues = queryString.split("&");

            for(var idx in keyValues) {
                var key = keyValues[idx].split("=");
                if(key.length > 1) {
                    assoc[decode(key[0])] = decode(key[1]);
                }
            }
            return assoc;
        };

        var parseQueryString = function(queryString) {
            var data = {},
                pairs,
                pair,
                separatorIndex,
                escapedKey,
                escapedValue,
                key,
                value;

            if(queryString === null) {
                return data;
            }

            pairs = queryString.split("&");

            for(var i = 0; i < pairs.length; i++) {
                pair = pairs[i];
                separatorIndex = pair.indexOf("=");

                if(separatorIndex === -1) {
                    escapedKey = pair;
                    escapedValue = null;
                } else {
                    escapedKey = pair.substr(0, separatorIndex);
                    escapedValue = pair.substr(separatorIndex + 1);
                }

                key = decodeURIComponent(escapedKey);
                value = decodeURIComponent(escapedValue);

                data[key] = value;
            }

            return data;
        };

        var cleanUpLocation = function () {
            window.location.hash = "";

            if(typeof (history.pushState) !== "undefined") {
                history.pushState("", document.title, location.pathname);
            }
        };

        var getFragment = function () {
            if(window.location.hash.indexOf("#") === 0) {
                return parseQueryString(window.location.hash.substr(1));
            } else {
                return {};
            }
        };

        return {
            getFragment: getFragment,
            cleanUpLocation: cleanUpLocation,
            getQueryStrings: getQueryStrings
        };
    }]);
})(angular.module("mongoOverflow"));