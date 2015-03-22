(function(app) {
    "use strict";

    app.controller("QuestionAddCtrl", ["httpService", "configuration", "$location", "identityService",
        function(httpService, configuration, $location, identityService) {
        var ctrl = this;
        this.form = this.form || {};
        this.question = {};

        this.post = function(question) {
            this.form.submitted = true;

            if(this.form.$valid) {
                var config = {
                    params: {
                        access_token: identityService.getAccessToken()
                    }
                };
                httpService.post(configuration.getBaseApiUrl() + "questions", question, config).success(function(data) {
                    $location.path("/questions/" + data._id);
                }).error(function(err) {
                    ctrl.errors = err.messages;
                });
            }
        };
    }]);
})(angular.module("mongoOverflow"));