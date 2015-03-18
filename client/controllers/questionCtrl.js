(function(app) {
    "use strict";

    app.controller("QuestionCtrl", ["httpService", "configuration", "$location", function(httpService, configuration, $location) {
        this.form = this.form || {};
        this.question = {};

        this.post = function(question) {
            this.form.submitted = true;

            if(this.form.$valid) {
                httpService.post(configuration.getBaseApiUrl() + "/questions", question).success(function(data) {
                    $location.path("/questions/" + data._id);
                });
            }
        };
    }]);
})(angular.module("mongoOverflow"));