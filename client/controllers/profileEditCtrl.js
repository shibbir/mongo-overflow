(function(app) {
    "use strict";

    app.controller("AvatarUploadCtrl", ["fileService", "notifierService", "configService", function(fileService, notifierService, configService) {
        this.uploadAvatar = function($files) {
            if($files && $files.length) {
                var file = $files[0];

                if(file.size > configService.imageUploadSize) {
                    notifierService.notifyError("Photo size is too large. Max upload size is 2MB.");
                }

                var uploadConfig = {
                    url: configService.baseApiUrl + "users/changeAvatar",
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

    app.controller("ProfileEditCtrl", ["httpService", "$timeout", "notifierService", "configService",
        function(httpService, $timeout, notifierService, configService) {
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
                httpService.patch(configService.baseApiUrl + "users/" + user._id, user).success(function() {
                    notifierService.notifySuccess("Information Updated!");
                });
            }
        };

        $timeout(function() {
            $("select.dropdown").dropdown();
        });
    }]);

    app.controller("PasswordResetCtrl", ["httpService", "notifierService", "configService", function(httpService, notifierService, configService) {
        this.form = this.form || {};
        this.data = {};
        var ctrl = this;

        this.changePassword = function() {
            this.form.submitted = true;

            if(this.form.$valid) {
                httpService.patch(configService.baseApiUrl + "users/changePassword", this.data).success(function() {
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