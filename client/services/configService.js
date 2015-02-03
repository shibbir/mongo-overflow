(function(app) {
    "use strict";

    app.factory("configService", [function() {
        var baseUrl = "http://localhost:7070";

        return {
            baseApiUrl: baseUrl + "/api",
            imageUploadSize: 1024 * 1024 * 2
        };
    }]);
})(angular.module("mongoOverflow"));