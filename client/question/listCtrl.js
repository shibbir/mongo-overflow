(function(app) {
    "use strict";

    app.controller("QuestionListCtrl", ["urlService", "httpService", "configuration", "$location",
        function(urlService, httpService, configuration, $location) {
            var ctrl = this;

            var config = {
                params: {
                    page: $location.search().page,
                    sort: $location.search().sort
                }
            };

            httpService.get(configuration.getBaseApiUrl() + "questions", config).success(function(response) {
                ctrl.questions = response.data;
                ctrl.initPagination(response.pagination);
            });

            this.initPagination = function(pagination) {
                ctrl.pages = [];

                for(var idx = 1; idx <= pagination.pages; idx++) {
                    ctrl.pages.push({
                        href: "/#/questions?page=" + idx,
                        active: !config.params.page && idx === 1 || parseInt(config.params.page) === idx
                    });
                }
                delete _.findWhere(ctrl.pages, { active: true}).href;
            };
        }
    ]);
})(angular.module("mongoOverflow"));