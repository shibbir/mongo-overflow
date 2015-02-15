(function(app) {
    "use strict";

    app.controller("ProfileEditCtrl", ["httpService", "$timeout", "notifierService", function(httpService, $timeout, notifierService) {
        var ctrl = this;

        this.form = this.form || {};

        this.init = function() {
            var userId = window.location.pathname.replace(/\//g, "").replace("users", "").replace("edit", "");
            httpService.get("/api/users/" + userId).success(function(data) {
                ctrl.user = data;

                $("#day .text").text(ctrl.user.birthday.day).removeClass("default");
                $("#day .item").removeClass("active selected");
                $("#day .item").filter(function() {
                    return $(this).data("value") === ctrl.user.birthday.day;
                }).addClass("active selected" );

                $("#month .text").text(ctrl.user.birthday.month).removeClass("default");
                $("#month .item").removeClass("active selected");
                $("#month .item").filter(function() {
                    return $(this).data("value") === ctrl.user.birthday.month;
                }).addClass("active selected" );

                $("#year .text").text(ctrl.user.birthday.year).removeClass("default");
                $("#year .item").removeClass("active selected");
                $("#year .item").filter(function() {
                    return $(this).data("value") === ctrl.user.birthday.year;
                }).addClass("active selected" );
            });
        }();

        this.update = function(user) {
            this.form.submitted = true;

            if(this.form.$valid) {
                httpService.patch("/api/users/" + user._id, user).success(function() {
                    notifierService.notifySuccess("Information Updated!");
                });
            }
        };

        $timeout(function() {
            $("select.dropdown").dropdown();
        });
    }]);

    app.controller("PasswordResetCtrl", ["httpService", "notifierService", function(httpService, notifierService) {
        this.form = this.form || {};
        this.data = {};

        this.changePassword = function() {
            this.form.submitted = true;

            if(this.form.$valid) {
                httpService.patch("/api/users/changePassword", this.data).success(function() {
                    notifierService.notifySuccess("Password Updated!");
                }).error(function(data) {
                    if(data) {
                        notifierService.notifyError(data.message);
                    }
                });
            }
        };
    }]);
})(angular.module("mongoOverflow"));