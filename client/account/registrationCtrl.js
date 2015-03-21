(function(app) {
    "use strict";

    app.controller("RegistrationCtrl", ["httpService", "configuration", "identity", "$location",
        function(httpService, configuration, identity, $location) {
            var ctrl = this;
            this.form = this.form || {};

            this.register = function($event) {
                this.form.submitted = true;

                if(this.form.$valid) {
                    var data = {
                        email: this.email,
                        name: this.name,
                        password: this.password
                    };
                    httpService.post(configuration.getBaseApiUrl() + "register", data).success(function(data) {
                        if(data.accessToken) {
                            identity.saveAccessToken(data.accessToken);
                            identity.saveLoggedInUser(data.user);
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