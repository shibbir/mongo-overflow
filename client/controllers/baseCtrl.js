(function(app) {
    "use strict";

    app.controller("BaseCtrl", ["configService", function(configService) {
        this.baseApiUrl = configService.baseApiUrl;
    }]);
})(angular.module("mongoOverflow"));