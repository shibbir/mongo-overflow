(function(app) {
    "use strict";

    app.controller("LoginCtrl", ["configuration", "httpService", "$location", "identityService",
        function(configuration, httpService, $location, identityService) {
            var ctrl = this;
            this.form = this.form || {};

            this.login = function($event) {
                this.form.submitted = true;

                if(this.form.$valid) {
                    var data = {
                        email: this.email,
                        password: this.password
                    };
                    httpService.post(configuration.getBaseApiUrl() + "token", data).success(function(data) {
                        if(data.accessToken) {
                            identityService.saveAccessToken(data.accessToken);
                            identityService.saveLoggedInUser(data.user);
                            $location.path("/");
                        }
                    }).error(function(err) {
                        ctrl.errors = err.messages;
                    });
                }

                $event.preventDefault();
            };
        }
    ]);
})(angular.module("mongoOverflow"));