var _              = require("lodash"),
    validator      = require("validator"),
    fileService    = require("../services/fileService"),
    utilityService = require("../services/utilityService"),
    userRepository = require("../repositories/userRepository");

var formatUserViewModel = function(user) {
    "use strict";
    return user;
};

var getUser = function(req, res) {
    "use strict";

    userRepository
        .find(req.params.id)
        .select("local.name local.email displayName avatar location website bio birthday")
        .populate("avatar", "fileName")
        .exec(function(err, doc) {
            if(err) {
                return res.sendStatus(500);
            }

            doc = doc.toObject();

            if(doc.avatar) {
                doc.avatar = utilityService.getProtocol(req) + "://" + "localhost:7070" + "/uploads/" + doc.avatar.fileName;
            }

            res.status(200).json(formatUserViewModel(doc));
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

var changeAvatar = function(req, res) {
    "use strict";

    if(!req.files.file) {
        return res.sendStatus(400);
    }

    fileService.add(req.files.file, function(err, doc) {
        if(err) {
            return res.sendStatus(500);
        }

        userRepository.update({ _id: req.user.id }, { $set: { avatar: doc._id }}, null, function(err) {
            if(err) {
                return res.sendStatus(500);
            }

            res.sendStatus(200);
        });
    });
};

var changePassword = function(req, res) {
    "use strict";

    if(!req.user.validPassword(req.body.oldPassword)) {
        return res.status(400).json({ message: "Old password is incorrect." });
    }

    if(req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({ message: "Confirm password didn't match." });
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
exports.changeAvatar = changeAvatar;
exports.changePassword = changePassword;