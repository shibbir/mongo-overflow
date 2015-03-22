(function(app) {
    "use strict";

    app.factory("tagService", ["httpService", "configuration", function(httpService, configuration) {

        var getTags = function() {
            return httpService.get(configuration.getBaseApiUrl() + "tags");
        };

        return {
            getTags: getTags
        };
    }]);
})(angular.module("mongoOverflow"));