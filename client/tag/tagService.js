(function(app) {
    "use strict";

    app.factory("tagService", ["httpService", "configuration", function(httpService, configuration) {

        var getTags = function(config) {
            return httpService.get(configuration.getBaseApiUrl() + "tags", config);
        };

        return {
            getTags: getTags
        };
    }]);
})(angular.module("mongoOverflow"));