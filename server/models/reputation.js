var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var ReputationSchema = Schema({
    contributor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    appreciator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question"
    },
    reputationType: {
        type: String,
        enum: ["upVote", "accept"]
    },
    contribution: {
        id: Schema.Types.ObjectId,
        type: {
            type: String,
            enum: ["question", "answer", "comment"]
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Reputation", ReputationSchema);