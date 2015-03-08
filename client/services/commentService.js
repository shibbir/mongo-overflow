(function(app) {
    "use strict";

    app.factory("commentService", [function() {
        var formatComment = function(comment) {
            comment.commenter.profileLink = "/users/" + comment.commenter._id + "/" + _.kebabCase(comment.commenter.displayName);
            if(comment.commenter.avatar) {
                comment.commenter.avatar = "/uploads/" + comment.commenter.avatar;
            }

            return comment;
        };

        return {
            formatComment: formatComment
        };
    }]);
})(angular.module("mongoOverflow"));