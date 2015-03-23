(function(app) {
    "use strict";

    app.controller("TagListCtrl", ["$location", "tagService", function($location, tagService) {
        var ctrl = this;

        var config = {
            params: {
                page: $location.search().page,
                sort: $location.search().sort
            }
        };

        tagService.getTags(config).success(function(response) {
            ctrl.tags = response.data;
            ctrl.initPagination(response.pagination);
        });

        this.initPagination = function(pagination) {
            ctrl.pages = [];

            for(var idx = 1; idx <= pagination.pages; idx++) {
                ctrl.pages.push({
                    href: "/#/tags?page=" + idx,
                    active: !config.params.page && idx === 1 || parseInt(config.params.page) === idx
                });
            }
            delete _.findWhere(ctrl.pages, { active: true }).href;
        };
    }]);
})(angular.module("mongoOverflow"));