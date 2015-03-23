(function(app) {
    "use strict";

    app.controller("AvatarUploadCtrl", ["fileService", "notifierService", "configuration", function(fileService, notifierService, configuration) {
        this.uploadAvatar = function($files) {
            if($files && $files.length) {
                var file = $files[0];

                if(file.size > configuration.getImageUploadSize()) {
                    notifierService.notifyError("Photo size is too large. Max upload size is 2MB.");
                }

                var uploadConfig = {
                    url: configuration.getBaseApiUrl() + "users/changeAvatar",
                    method: "PATCH",
                    file: file
                };

                fileService.upload(uploadConfig).progress(function (evt) {
                }).success(function () {
                    notifierService.notifySuccess("Profile picture updated!");
                });
            }
        };
    }]);

    app.controller("ProfileEditCtrl", ["httpService", "$timeout", "notifierService", "configuration",
        function(httpService, $timeout, notifierService, configuration) {
        var ctrl = this;

        this.form = this.form || {};

        this.init = function() {
            var userId = window.location.pathname.replace(/\//g, "").replace("users", "").replace("edit", "");
            httpService.get("/api/users/" + userId).success(function(data) {
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

            if(this.form.$valid) {
                httpService.patch(configuration.getBaseApiUrl + "users/" + user._id, user).success(function() {
                    notifierService.notifySuccess("Information Updated!");
                });
            }
        };

        $timeout(function() {
            $("select.dropdown").dropdown();
        });
    }]);

    app.controller("PasswordResetCtrl", ["httpService", "notifierService", "configuration", function(httpService, notifierService, configuration) {
        this.form = this.form || {};
        this.data = {};
        var ctrl = this;

        this.changePassword = function() {
            this.form.submitted = true;

            if(this.form.$valid) {
                httpService.patch(configuration.getBaseApiUrl + "users/changePassword", this.data).success(function() {
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