(function(app) {
    "use strict";

    app.factory("fileService", ["$upload", function($upload) {

        var upload = function(config) {
            return $upload.upload({
                url: config.url,
                method: config.method || "POST",
                file: config.file,
                fields: config.data
            });
        };

        return {
            upload: upload
        };
    }]);
})(angular.module("mongoOverflow"));