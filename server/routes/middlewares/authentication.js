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
        return res.redirect("/users/login");
    }
    res.locals.user = req.user;
    next();
};