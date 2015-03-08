var mongoose = require("mongoose"),
    bcrypt   = require("bcrypt-nodejs"),
    Schema   = mongoose.Schema,
    enums    = require("../config/enums");

var ReputationSchema = Schema({
    contributor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    appreciator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    reputationType: {
        type: String,
        enum: [ enums.reputation.UpVote, enums.reputation.DownVote, enums.reputation.Accepted ]
    },
    area: {
        id: Schema.Types.ObjectId,
        type: {
            type: String,
            enum: [ enums.reputation.Question, enums.reputation.Answer, enums.reputation.Comment ]
        }
    },
    contribution: {
        asked: Boolean,
        answered: Boolean,
        commented: Boolean,
        votedDown: Boolean,
        accepted: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var UserSchema = Schema({
    local: {
        email: {
            type: String,
            unique: true,
            match: [/.+\@.+\..+/]
        },
        password: String,
        name: String
    },
    facebook: {
        id: String,
        name: String,
        email: String,
        token: String
    },
    twitter: {
        id: String,
        name: String,
        token: String,
        username: String
    },
    google: {
        id: String,
        name: String,
        token: String,
        email: String
    },
    github: {
        id: String,
        name: String,
        email: String,
        username: String
    },
    displayName: {
        type: String,
        required: true
    },
    avatar: {
        type: Schema.Types.ObjectId,
        ref: "File"
    },
    location: String,
    website: String,
    bio: String,
    birthday: {
        day: Number,
        year: Number,
        month: Number
    },
    reputations: [ ReputationSchema ],
    badges: [{
        type: Schema.Types.ObjectId,
        ref: "Badge"
    }],
    role: {
        type: String,
        enum: [ enums.role.Basic, enums.role.Moderator, enums.role.Admin ],
        default: enums.role.Basic
    },
    views: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.isAdmin = function() {
    "use strict";
    return this.roles.indexOf(enums.role.Admin) !== -1;
};

UserSchema.methods.isModerator = function() {
    "use strict";
    return this.roles.indexOf(enums.role.Moderator) !== -1;
};

UserSchema.methods.generateHash = function(password) {
    "use strict";
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    "use strict";
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", UserSchema);