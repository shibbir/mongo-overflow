(function() {
    "use strict";

    angular.module("mongoOverflow", ["ngRoute", "ngMessages", "angularFileUpload"]);

    angular.module("mongoOverflow").config(["$httpProvider", "$compileProvider", "configurationProvider",
        function($httpProvider, $compileProvider, configurationProvider) {
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
            $compileProvider.debugInfoEnabled(false);

            configurationProvider.setBaseApiUrl("http://localhost:7575/api/");
            configurationProvider.setImageUploadSize(1024 * 1024 * 2);
            configurationProvider.setBrowserStoragePrefix("mongoOverflow");
        }
    ]);

    angular.module("mongoOverflow").config(["$routeProvider", function($routeProvider) {
        var resolve = {
            authentication: ["$q", "identity", function($q, identityProvider) {
                var defer = $q.defer();
                if(!identityProvider.getAccessToken()) {
                    defer.reject();
                } else {
                    defer.resolve();
                }
                return defer.promise;
            }]
        };
        $routeProvider
            .when("/", {
                templateUrl: "/templates/home.html"
            })
            .when("/login", {
                templateUrl: "/account/login.html",
                controller: "LoginCtrl"
            })
            .when("/register", {
                templateUrl: "/account/register.html",
                controller: "RegistrationCtrl"
            })
            .when("/questions/ask", {
                templateUrl: "/question/add.html",
                controller: "QuestionAddCtrl",
                resolve: resolve
            })
            .otherwise({ redirectTo: "/" });
        }
    ]);

    angular.module("mongoOverflow").run(["identity", "$rootScope", "$location", function(identityProvider, $rootScope, $location) {
        if(identityProvider.getAccessToken()) {
            $rootScope.loggedInUser = identityProvider.getLoggedInUser();
        }

        $rootScope.$on("$routeChangeError", function() {
            $location.path("/login");
        });

        $rootScope.$on("$locationChangeStart", function() {
            if(identityProvider.getAccessToken()) {
                $rootScope.loggedInUser = identityProvider.getLoggedInUser();
            } else {
                delete $rootScope.loggedInUser;
            }
        });
    }]);
})();