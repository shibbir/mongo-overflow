var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var TagSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "Question"
    }]
});

module.exports = mongoose.model("Tag", TagSchema);