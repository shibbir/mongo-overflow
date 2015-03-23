(function(app) {
    "use strict";

    app.factory("userService", ["httpService", "configuration", "identityService", "fileService",
        function(httpService, configuration, identityService, fileService) {

            var getUser = function(userId) {
                return httpService.get(configuration.getBaseApiUrl() + "users/" + userId);
            };

            var update = function(userId, data) {
                var config = {
                    params: {
                        access_token: identityService.getAccessToken()
                    }
                };

                return httpService.patch(configuration.getBaseApiUrl() + "users/" + userId, data, config);
            };

            var changeAvatar = function(userId, file) {
                var uploadConfig = {
                    url: configuration.getBaseApiUrl() + "users/" + userId + "/changeAvatar?access_token=" + identityService.getAccessToken(),
                    method: "PATCH",
                    file: file
                };

                return fileService.upload(uploadConfig);
            };

            var changePassword = function(userId, data) {
                var config = {
                    params: {
                        access_token: identityService.getAccessToken()
                    }
                };

                return httpService.patch(configuration.getBaseApiUrl() + "users/" + userId + "/changePassword", data, config);
            };


            return {
                getUser: getUser,
                update: update,
                changeAvatar: changeAvatar,
                changePassword: changePassword
            };
        }
    ]);
})(angular.module("mongoOverflow"));