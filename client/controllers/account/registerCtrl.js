(function(app) {
    "use strict";

    app.controller("RegisterCtrl", [function() {
        this.form = this.form || {};

        this.register = function($event) {
            this.form.submitted = true;
            if(!this.form.$valid) {
                $event.preventDefault();
            }
        };
    }]);
})(angular.module("mongoOverflow"));