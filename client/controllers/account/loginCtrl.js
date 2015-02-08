(function(app) {
    "use strict";

    app.controller("LoginCtrl", [function() {
        this.form = this.form || {};

        this.login = function($event) {
            this.form.submitted = true;
            if(!this.form.$valid) {
                $event.preventDefault();
            }
        };
    }]);
})(angular.module("mongoOverflow"));