(function(app) {
    "use strict";

    app.controller("QuestionCtrl", ["httpService", function(httpService) {
        this.form = this.form || {};
        this.question = {};

        this.post = function(question) {
            this.form.submitted = true;

            if(this.form.$valid) {
                httpService.post("/api/questions", question).success(function(data) {
                    window.location = "/questions/" + data._id;
                });
            }
        };
    }]);
})(angular.module("mongoOverflow"));