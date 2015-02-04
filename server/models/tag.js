var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var TagSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    tagged: [{
        type: Schema.Types.ObjectId,
        ref: "Question"
    }]
});

module.exports = mongoose.model("Tag", TagSchema);