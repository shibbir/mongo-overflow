(function(app) {
    "use strict";

    app.factory("tagService", ["httpService", "configService", function(httpService, configService) {

        var getTags = function() {
            return httpService.get(configService.baseApiUrl + "/tags");
        };

        return {
            getTags: getTags
        };
    }]);
})(angular.module("mongoOverflow"));