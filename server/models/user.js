﻿var mongoose = require("mongoose"),
    bcrypt   = require("bcrypt-nodejs"),
    Schema   = mongoose.Schema;

var UserSchema = Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    name: {
        type: String
    },
    password: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.generateHash = function(password) {
    "use strict";

    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    "use strict";

    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);