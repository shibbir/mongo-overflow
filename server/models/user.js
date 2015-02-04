var mongoose = require("mongoose"),
    bcrypt   = require("bcrypt-nodejs"),
    Schema   = mongoose.Schema;

var UserSchema = Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/]
    },
    password: String,
    avatar: String,
    name: String,
    location: String,
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
    createdDate: {
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
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);