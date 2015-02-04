var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var QuestionSchema = Schema({
    title: String,
    description: String,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: "Answer"
    }],
    upVotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downVotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    views: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Question", QuestionSchema);