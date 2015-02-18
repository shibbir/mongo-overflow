(function(app) {
    "use strict";

    app.controller("QuestionCtrl", ["httpService", "configService", function(httpService, configService) {
        this.form = this.form || {};
        this.question = {};

        this.post = function(question) {
            this.form.submitted = true;

            if(this.form.$valid) {
                httpService.post(configService.baseApiUrl + "/questions", question).success(function(data) {
                    window.location = "/questions/" + data._id;
                });
            }
        };
    }]);
})(angular.module("mongoOverflow"));