exports.requireAnonymous = function(req, res, next) {
    "use strict";

    if(req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

exports.requiresLogin = function(req, res, next) {
    "use strict";

    if(!req.isAuthenticated()) {

        if(req.xhr()) {
            return res.sendStatus(401);
        }

        return res.redirect("/auth/login");
    }
    next();
};