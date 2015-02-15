var _              = require("lodash"),
    validator      = require("validator"),
    userRepository = require("../repositories/userRepository");

var getUser = function(req, res) {
    "use strict";

    userRepository
        .find(req.params.id)
        .select("local.name local.email displayName avatar location website bio birthday")
        .exec(function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            res.status(200).json(doc);
        });
};

var updateInfo = function(req, res) {
    "use strict";

    var model = {
        bio: validator.escape(req.body.bio),
        "local.name": req.body.local.name,
        "local.email": req.body.local.email,
        website: req.body.website,
        location: req.body.location,
        "birthday.day": _.parseInt(_.result(req.body.birthday, "day")),
        "birthday.month": _.parseInt(_.result(req.body.birthday, "month")),
        "birthday.year": _.parseInt(_.result(req.body.birthday, "year")),
        displayName: req.body.displayName
    };

    userRepository.update({ _id: req.params.id }, { $set: model }, null, function(err) {
        if(err) {
            return res.sendStatus(500);
        }

        res.sendStatus(200);
    });
};

var changePassword = function(req, res) {
    "use strict";

    if(req.user.generateHash(req.body.oldPassword) !== req.user.local.password) {
        return res.status(400).json({ message: "Old password is incorrect" });
    }

    userRepository.update({ _id: req.user.id }, { $set: { "local.password": req.user.generateHash(req.body.newPassword) }}, null, function(err) {
        if(err) {
            return res.sendStatus(500);
        }

        res.sendStatus(200);
    });
};

exports.getUser = getUser;
exports.updateInfo = updateInfo;
exports.changePassword = changePassword;