var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var CommentSchema = Schema({
    text: String,
    commenter: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
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

module.exports = mongoose.model("Comment", CommentSchema);