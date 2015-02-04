var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var AnswerSchema = Schema({
    text: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    acceptance: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    upVotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downVotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Answer", AnswerSchema);