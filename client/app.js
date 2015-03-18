(function() {
    "use strict";

    angular.module("mongoOverflow", ["ngRoute", "ngMessages", "angularFileUpload"]);

    angular.module("mongoOverflow").config(["$httpProvider", "$compileProvider", "configurationProvider", "identityProvider",
        function($httpProvider, $compileProvider, configurationProvider, identityProvider) {
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
            $compileProvider.debugInfoEnabled(false);

            $httpProvider.interceptors.push(["$q", "$location", function($q, $location) {
                return {
                    response: function(response) {
                        return response;
                    },
                    responseError: function(response) {
                        if(response.status === 401) {
                            identityProvider.clearAccessToken();
                            identityProvider.clearLoggedInUser();
                            $location.path("/login");
                        }
                        return $q.reject(response);
                    }
                };
            }]);

            configurationProvider.setBaseApiUrl("http://localhost:7575/api/");
            configurationProvider.setImageUploadSize(1024 * 1024 * 2);
            configurationProvider.setBrowserStoragePrefix("mongoOverflow");
        }
    ]);

    angular.module("mongoOverflow").config(["$routeProvider", function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/templates/home.html"
            })
            .when("/login", {
                templateUrl: "/templates/login.html",
                controller: "LoginCtrl"
            })
            .otherwise({ redirectTo: "/" });
        }
    ]);

    angular.module("mongoOverflow").run(["identity", "$rootScope", function(identityProvider, $rootScope) {
        if(identityProvider.getAccessToken()) {
            $rootScope.loggedInUser = identityProvider.getLoggedInUser();
        }

        $rootScope.$on("$locationChangeStart", function() {
            if (identityProvider.getAccessToken()) {
                $rootScope.loggedInUser = identityProvider.getLoggedInUser();
            } else {
                delete $rootScope.loggedInUser;
            }
        });
    }]);
})();