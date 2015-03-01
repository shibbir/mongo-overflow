var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

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
        enum: ["upVote", "downVote", "accepted"]
    },
    area: {
        id: Schema.Types.ObjectId,
        type: {
            type: String,
            enum: ["question", "answer", "comment"]
        }
    },
    contribution: {
        asked: Boolean,
        answered: Boolean,
        commented: Boolean,
        votedDown: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Reputation", ReputationSchema);