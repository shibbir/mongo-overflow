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
            authentication: ["$q", "identityService", function($q, identityService) {
                var defer = $q.defer();
                if(!identityService.getAccessToken()) {
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
            .when("/users/:id", {
                templateUrl: "/user/profile.html",
                controller: "ProfileCtrl"
            })
            .when("/users/:id/edit", {
                templateUrl: "/user/edit.html",
                controller: "ProfileEditCtrl"
            })
            .when("/register", {
                templateUrl: "/account/register.html",
                controller: "RegistrationCtrl"
            })
            .when("/questions", {
                templateUrl: "/question/list.html",
                controller: "QuestionListCtrl"
            })
            .when("/questions/ask", {
                templateUrl: "/question/add.html",
                controller: "QuestionAddCtrl",
                resolve: resolve
            })
            .when("/questions/:id", {
                templateUrl: "/question/details.html",
                controller: "QuestionDetailsCtrl"
            })
            .otherwise({ redirectTo: "/" });
        }
    ]);

    angular.module("mongoOverflow").run(["identityService", "$rootScope", "$location", "urlService",
        function(identityService, $rootScope, $location, urlService) {
            $rootScope.$on("$routeChangeError", function() {
                $location.path("/login");
            });

            $rootScope.$on("$locationChangeStart", function(event) {

                var fragment = urlService.getFragment();

                if(fragment["/provider"]) {
                    fragment.provider = fragment["/provider"];
                    event.preventDefault();
                }

                if(fragment.error) {
                    urlService.cleanUpLocation();
                    $location.path("/");
                } else if(fragment.token) {
                    urlService.cleanUpLocation();
                    identityService.getUserByToken(fragment.token, fragment.provider).success(function(data) {
                        if(data.accessToken) {
                            identityService.saveAccessToken(data.accessToken);
                            identityService.saveLoggedInUser(data.user);
                            $rootScope.loggedInUser = identityService.getLoggedInUser();
                            $location.path("/");
                        }
                    }).error(function () {
                        $location.path("/login");
                    });
                } else {
                    if(identityService.getAccessToken()) {
                        $rootScope.loggedInUser = identityService.getLoggedInUser();
                    } else {
                        delete $rootScope.loggedInUser;
                    }
                }
            });
        }
    ]);
})();