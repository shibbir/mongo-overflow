(function(app) {
    "use strict";

    app.controller("QuestionAddCtrl", ["httpService", "configuration", "$location", function(httpService, configuration, $location) {
        var ctrl = this;
        this.form = this.form || {};
        this.question = {};

        this.post = function(question) {
            this.form.submitted = true;

            if(this.form.$valid) {
                httpService.post(configuration.getBaseApiUrl() + "questions", question).success(function(data) {
                    $location.path("/questions/" + data._id);
                }).error(function(err) {
                    ctrl.error = err;
                });
            }
        };
    }]);
})(angular.module("mongoOverflow"));