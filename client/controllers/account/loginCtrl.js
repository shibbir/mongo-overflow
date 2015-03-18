(function(app) {
    "use strict";

    app.controller("LoginCtrl", ["configuration", "httpService", "$location", "identity",
        function(configuration, httpService, $location, identity) {
        this.form = this.form || {};

        this.login = function() {
            this.form.submitted = true;
            if(this.form.$valid) {
                var data = {
                    email: this.email,
                    password: this.password
                };
                httpService.post(configuration.getBaseApiUrl() + "token", data).success(function(data) {
                    if(data.accessToken) {
                        identity.saveAccessToken(data.accessToken);
                        identity.saveLoggedInUser(data.user);
                        $location.path("/");
                    }
                });
            }
        };
    }]);
})(angular.module("mongoOverflow"));