(function(app) {
    "use strict";

    app.factory("commentService", [function() {
        var formatComment = function(comment) {
            comment.date = moment(comment.date).calendar();

            return comment;
        };

        return {
            formatComment: formatComment
        };
    }]);
})(angular.module("mongoOverflow"));