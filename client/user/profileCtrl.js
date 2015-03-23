(function(app) {
    "use strict";

    app.controller("ProfileCtrl", ["httpService", "configuration", "$routeParams", "identityService",
        function(httpService, configuration, $routeParams, identityService) {
        var ctrl = this;

        httpService.get(configuration.getBaseApiUrl() + "users/" + $routeParams.id).success(function(data) {
            ctrl.profile = data;

            if(identityService.isLoggedIn()) {
                var config = {
                    params: {
                        access_token: identityService.getAccessToken()
                    }
                };
                httpService.patch(configuration.getBaseApiUrl() + "users/" + $routeParams.id + "/views", null, config).success(function (data) {
                    if (_.isArray(data)) {
                        ctrl.profile.views = data;
                    }
                });
            }
        });
    }]);
})(angular.module("mongoOverflow"));