var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var ReputationSchema = Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question"
    },
    reputedFor: Schema.Types.ObjectId,
    contentType: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Reputation", ReputationSchema);