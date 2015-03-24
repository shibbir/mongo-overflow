(function(app) {
    "use strict";

    app.controller("AvatarUploadCtrl", ["userService", "notifierService", "configuration", "$routeParams",
        function(userService, notifierService, configuration, $routeParams) {

            this.uploadAvatar = function($files) {
                if($files && $files.length) {
                    var file = $files[0];

                    if(file.size > configuration.getImageUploadSize()) {
                        notifierService.notifyError("Photo size is too large. Max upload size is 2MB.");
                    }

                    userService.changeAvatar($routeParams.id, file).progress(function (evt) {
                    }).success(function () {
                        notifierService.notifySuccess("Profile picture updated!");
                    }).error(function() {
                        notifierService.notifyError("Something happened. Please try again.");
                    });
                }
            };
        }
    ]);

    app.controller("ProfileEditCtrl", ["userService", "$timeout", "notifierService", "$routeParams",
        function(userService, $timeout, notifierService, $routeParams) {
            var ctrl = this;

            this.form = this.form || {};

            this.init = function() {
                userService.getUser($routeParams.id).success(function(data) {
                    ctrl.user = data;

                    if(ctrl.user.birthday) {
                        $("#day .text").text(ctrl.user.birthday.day).removeClass("default");
                        $("#day .item").removeClass("active selected");
                        $("#day .item").filter(function () {
                            return $(this).data("value") === ctrl.user.birthday.day;
                        }).addClass("active selected");

                        $("#month .text").text(ctrl.user.birthday.month).removeClass("default");
                        $("#month .item").removeClass("active selected");
                        $("#month .item").filter(function () {
                            return $(this).data("value") === ctrl.user.birthday.month;
                        }).addClass("active selected");

                        $("#year .text").text(ctrl.user.birthday.year).removeClass("default");
                        $("#year .item").removeClass("active selected");
                        $("#year .item").filter(function () {
                            return $(this).data("value") === ctrl.user.birthday.year;
                        }).addClass("active selected");
                    }
                });
            }();

            this.update = function(user) {
                this.form.submitted = true;

                var months = [
                    "january", "february", "march", "april",
                    "may", "june", "july", "august", "september",
                    "october", "november", "december"
                ];

                var day = $("#day .text").text(),
                    month = _.indexOf(months, $("#month .text").text().toLowerCase()) + 1,
                    year = $("#year .text").text();

                if(moment(day + "/" + month + "/" + year).isValid()) {
                    user.birthday = {
                        day: day,
                        month: month,
                        year: year
                    };

                    delete ctrl.showBirthdayValidationError;
                } else {
                    ctrl.showBirthdayValidationError = true;
                }

                if(this.form.$valid && moment(day + "/" + month + "/" + year).isValid()) {
                    userService.update(user._id, user).success(function() {
                        notifierService.notifySuccess("Information Updated!");
                    }).error(function() {
                        notifierService.notifyError("Something happened. Please try again.");
                    });
                }
            };

            $timeout(function() {
                $("select.dropdown").dropdown();
            });
        }
    ]);

    app.controller("PasswordResetCtrl", ["userService", "notifierService", "$routeParams", function(userService, notifierService, $routeParams) {
        this.form = this.form || {};
        this.data = {};
        var ctrl = this;

        this.changePassword = function() {
            this.form.submitted = true;

            if(this.form.$valid) {
                userService.changePassword($routeParams.id, this.data).success(function() {
                    notifierService.notifySuccess("Password Updated!");
                    ctrl.data = {};
                    delete ctrl.form.submitted;
                }).error(function(data) {
                    if(data) {
                        notifierService.notifyError(data.message);
                    }
                });
            }
        };
    }]);
})(angular.module("mongoOverflow"));