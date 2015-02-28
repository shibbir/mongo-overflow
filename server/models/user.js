var mongoose = require("mongoose"),
    bcrypt   = require("bcrypt-nodejs"),
    Schema   = mongoose.Schema;

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
    reputations: [{
        type: Schema.Types.ObjectId,
        ref: "Reputation"
    }],
    badges: [{
        type: Schema.Types.ObjectId,
        ref: "Badge"
    }],
    role: {
        type: String,
        enum: ["basic", "moderator", "admin"],
        default: "basic"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.isAdmin = function() {
    "use strict";
    return this.roles.indexOf("admin") !== -1;
};

UserSchema.methods.isModerator = function() {
    "use strict";
    return this.roles.indexOf("moderator") !== -1;
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