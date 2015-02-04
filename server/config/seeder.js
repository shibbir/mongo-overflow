var _        = require("lodash"),
    faker    = require("Faker"),
    async    = require("async"),
    Tag      = require("../models/tag"),
    User     = require("../models/user"),
    Badge    = require("../models/badge"),
    Question = require("../models/question");

var tags = [],
    users = [];

var randomSelector = function(collections, numOfItems) {
    "use strict";

    numOfItems = numOfItems || 10;

    var items = _.random(1, numOfItems),
        array = [];

    for(var idx = 0; idx < items; idx++) {
        array.push(collections[ _.random(0, collections.length - 1) ]);
    }

    return _.uniq(array);
};

var tagSeeder = function(callback) {
    "use strict";

    var array = [];
    for(var idx = 0; idx < 200; idx++) {
        array.push(idx);
    }

    async.each(array, function(idx, asyncCallback) {
        new Tag({
            name: faker.Internet.userName(),
            description: faker.Lorem.sentences(2)
        }).save(function(err, doc) {
            tags.push(doc);
            asyncCallback();
        });
    }, function() {
        callback(null, "Tag seeder completed.");
    });
};

var badgeSeeder = function(callback) {
    "use strict";

    var categories = [ "question", "answer", "participation", "moderation", "other" ],
        array = [];

    for(var idx = 0; idx < 200; idx++) {
        array.push(idx);
    }

    async.each(array, function(idx, outerAsyncCallback) {
        new Badge({
            title: faker.Internet.userName(),
            description: faker.Lorem.sentences(2),
            awarded: randomSelector(users),
            category: categories[ _.random(0, 4) ]
        }).save(function(err, badge) {
            async.each(badge.awarded, function(user, innerAsyncCallback) {
                User.update({ _id: user }, { $addToSet: { badges: badge._id }}, function() {
                    innerAsyncCallback();
                });
            }, function() {
                outerAsyncCallback();
            });
        });
    }, function() {
        callback(null, "Badge seeder completed.");
    });
};

var userSeeder = function(callback) {
    "use strict";

    var array = [];
    for(var idx = 0; idx < 50; idx++) {
        array.push(idx);
    }

    async.each(array, function(idx, asyncCallback) {
        var user = new User();
        user.name = faker.Name.findName();
        user.email = faker.Internet.email();
        user.password = user.generateHash("123456");
        user.location = faker.Address.ukCountry();

        user.save(function(err, doc) {
            users.push(doc);
            asyncCallback();
        });
    }, function() {
        callback(null, "User seeder completed.");
    });
};

var questionSeeder = function(callback) {
    "use strict";

    var array = [];
    for(var idx = 0; idx < 50; idx++) {
        array.push(idx);
    }

    async.each(array, function(idx, outerAsyncCallback) {
        new Question({
            title: faker.Lorem.sentence(),
            description: faker.Lorem.paragraphs(5),
            creator: users[ _.random(0, 29) ]._id,
            tags: randomSelector(tags)
        }).save(function(err, question) {
            async.each(question.tags, function(tag, innerAsyncCallback) {
                Tag.update({ _id: tag }, { $addToSet: { tagged: question._id }}, function() {
                    innerAsyncCallback();
                });
            }, function() {
                outerAsyncCallback();
            });
        });
    }, function() {
        callback(null, "Question seeder completed.");
    });
};

exports.seed = function () {
    "use strict";

    async.series([ userSeeder, tagSeeder, badgeSeeder, questionSeeder ], function(err, messages) {
        _.forEach(messages, function(message) {
            console.info(message);
        });
    });
};