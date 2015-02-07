(function(app) {
    "use strict";

    app.controller("RegistrationCtrl", ["$scope", function($scope) {
        $scope.registrationForm = $scope.registrationForm || {};

        $scope.register = function($event) {
            $scope.registrationForm.submitted = true;
            if(!$scope.registrationForm.$valid) {
                $event.preventDefault();
            }
        };
    }]);
})(angular.module("mongoOverflow"));