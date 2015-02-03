(function(app) {
    "use strict";

    app.controller("BaseCtrl", ["$scope", "configService", function($scope, configService) {
        $scope.dirtyScope = {};

        $scope.baseApiUrl = configService.baseApiUrl;
        $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
    }]);
})(angular.module("mongoOverflow"));