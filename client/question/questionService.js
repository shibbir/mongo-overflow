(function(app) {
    "use strict";

    app.factory("questionService", [function() {
        var formatQuestion = function(question) {
            question.date = moment(question.date).calendar();

            return question;
        };

        return {
            formatQuestion: formatQuestion
        };
    }]);
})(angular.module("mongoOverflow"));