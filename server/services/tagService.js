var Tag = require("../models/tag");

var getTags = function(req, res) {
    "use strict";

    Tag.find({}).select("name description").exec(function(err, docs) {
        if(err) {
            return res.sendStatus(500);
        }

        res.status(200).json(docs);
    });
};

exports.getTags = getTags;