(function(app) {
    "use strict";

    app.controller("ProfileEditCtrl", ["httpService", "$timeout", function(httpService, $timeout) {
        var ctrl = this;

        this.form = this.form || {};

        this.init = function() {
            var userId = window.location.pathname.replace(/\//g, "").replace("users", "").replace("edit", "");
            httpService.get("/api/users/" + userId).success(function(data) {
                ctrl.user = data;
            });
        }();

        this.update = function(user) {
            this.form.submitted = true;

            if(this.form.$valid) {
                httpService.patch("/api/users/" + user._id, user).success(function() {
                    window.location = "/users/" + user._id + "/edit";
                });
            }
        };

        $timeout(function() {
            $("select.dropdown").dropdown();
        });
    }]);
})(angular.module("mongoOverflow"));