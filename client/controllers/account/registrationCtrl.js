(function(app) {
    "use strict";

    app.controller("RegistrationCtrl", ["$scope", function($scope) {
        $scope.registrationForm = $scope.registrationForm || {};

        $scope.register = function() {
            $scope.registrationForm.submitted = true;
            if($scope.registrationForm.$valid) {}
        };
    }]);
})(angular.module("mongoOverflow"));