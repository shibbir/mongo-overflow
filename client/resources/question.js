(function(app) {
    "use strict";

    app.factory("Question", ["$resource", function($resource) {
        return $resource("/api/questions", {}, {
            update: {
                method: "PUT"
            }
        });
    }]);
})(angular.module("mongoOverflow"));