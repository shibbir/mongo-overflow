(function(app) {
    "use strict";

    app.controller("QuestionCtrl", ["$resource", function($resource) {
        this.form = this.form || {};
        this.question = {};

        this.post = function(question) {
            this.form.submitted = true;

            if(this.form.$valid) {
                $resource("/api/questions").save(question);
            }
        };
    }]);
})(angular.module("mongoOverflow"));