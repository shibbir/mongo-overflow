(function(app) {
    "use strict";

    app.factory("baseService", [function() {
        var getQueryStrings = function () {
            var assoc = {};
            var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
            var queryString = location.search.substring(1);
            var keyValues = queryString.split("&");

            for(var i in keyValues) {
                var key = keyValues[i].split("=");
                if(key.length > 1) {
                    assoc[decode(key[0])] = decode(key[1]);
                }
            }
            return assoc;
        };

        return {
            getQueryStrings: getQueryStrings
        };
    }]);
})(angular.module("mongoOverflow"));